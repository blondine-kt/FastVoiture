from fastapi import FastAPI,Depends
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlmodel import SQLModel,Field,create_engine,Session
from typing import Annotated
from securite import password_hash,password_verify
from models import Driver,Con,Drivers
from function import saved,login
app=FastAPI()
app.add_middleware ( CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]) #permet la communication avec react 

# connection a la Base de donnees
url="mssql+pyodbc://(LocalDB)\\MSSQLLocalDB/FastVoiture?driver=ODBC+Driver+17+for+SQL+Server" 
engine=create_engine(url)

#creation de tables
def create_table():
     SQLModel.metadata.create_all(engine)
    
def get_session():
     with Session(engine) as session:
          yield session
SessionDep=Annotated[Session,Depends(get_session)]


@app.on_event("startup")
async def on_startup():
     create_table()


def user_verify(item,session:SessionDep):
     users=session.query(Drivers).filter(Drivers.userName==item).first()
     return users
     

@app.post("/")
async def Register (user:Driver,session:SessionDep):
        new_user=Drivers(
             userName=user.userName,
             password=password_hash( user.password),
             nom=user.nom,
             email=user.email,
             phone=user.phone,
             license_plate=user.license_plate,
             driver_license=user.driver_license)
        
        if user_verify(new_user.userName,session):
             response={"message":"nom d'utiliateur deja existant "}
        else:
            session.add(new_user)
            session.commit()
            session.refresh(new_user)
            response={"message":"bien ajoute","user":new_user}
        return response
        
@app.post("/Login")
async def connexion(user:Con, session:SessionDep):
       new_user=Drivers(userName=user.userName,password=user.password)
       
       users=session.query(Drivers).filter(Drivers.userName==new_user.userName).first()
       
       if users:
            verify=password_verify(new_user.password,users.password)
            
            if verify:
                return{"message":"bonne connexion"}
            else:
                 return{"message":"mot de passe incorrect"}

       else:
            return{"message":"personne inexistante"}
       
# cette fonction enregistre un visage dans la db       
@app.post("/saved_face")
async def saved_face(names,url):
    saved(names,url)
    print(f"le nom recu est : {names}")
    return {'message': 'Données reçues avec succès'}

#cette fonction permet de faire la reconaissance faciale
@app.post("/login_face")
async def saved_face(url):
    name=login(url)
    print(f"le client se nomme  : {name}")
    return {'message': 'Votre capture est  en plein traitrement'}




if __name__=="__main__":
    uvicorn.run(app,host="0.0.0.0", port=8022, workers=1)