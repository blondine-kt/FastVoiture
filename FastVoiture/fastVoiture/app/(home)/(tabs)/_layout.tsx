import { Tabs } from "expo-router";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import { faTaxi } from "@fortawesome/free-solid-svg-icons/faTaxi";
import { faChartPie } from "@fortawesome/free-solid-svg-icons/faChartPie";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";

import React from "react";


export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#2a9ec6" }}>
      <Tabs.Screen
        name="acceuil"
        options={{
          title: "Acceuil",
          tabBarIcon: () => <FontAwesomeIcon icon={faHouse} />,
        }}
      />
      <Tabs.Screen
        name="services"
        options={{
          title: "Services",
          tabBarIcon: () => <FontAwesomeIcon icon={faTaxi} />,
        }}
      />
      <Tabs.Screen
        name="activities"
        options={{
          title: "Activites",
          tabBarIcon: () => <FontAwesomeIcon icon={faChartPie} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Compte",
          tabBarIcon: () => <FontAwesomeIcon icon={faUser} />,
        }}
      />
    </Tabs>
  );
}
