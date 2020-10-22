import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { loggingOut } from "../../API/generalOp";
import { Text } from "react-native";

export default function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label={({ color }) => (
          <Text style={{ color: "#575D90", fontWeight: "bold", fontSize: 15 }}>
            Sign Out
          </Text>
        )}
        onPress={() => loggingOut()}
      />
    </DrawerContentScrollView>
  );
}
