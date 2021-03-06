import { useRouter } from "next/dist/client/router";
import { FunctionComponent } from "react";
import { SidebarLayout } from "packages/ui";
import { IoMdExit } from 'react-icons/io'

import { MdOutlineSettings } from 'react-icons/md'
import { BsFillCloudArrowUpFill, BsPerson } from 'react-icons/bs'
import RemoteConfigIcon from '../packages/ui/components/RemoteConfigIcon'
import { ENTITIES } from "common/casl/Ability";
export const Menu: FunctionComponent = () => {
  const router = useRouter();

  return (
    <SidebarLayout
      topMenu={[
        {
          permission: ENTITIES.Reports,
          text: "Reports",
          icon: <BsFillCloudArrowUpFill />,
          onClick: () => router.replace("/report"),
          selected: router.route.includes("/report"),
        },
        {
          permission: ENTITIES.Users,
          text: "Users",
          icon: <BsPerson />,
          onClick: () => router.replace("/user"),
          selected: router.route.includes("/user"),
        },
        {
          permission: ENTITIES.RemoteConfigurations,
          text: "Configurations",
          icon: <RemoteConfigIcon />,
          onClick: () => router.replace("/configuration"),
          selected: router.route.includes("/configuration"),
        }
      ]}
      bottomMenu={[
        {
          permission: ENTITIES.Web,
          text: "Settings",
          icon: <MdOutlineSettings />,
          onClick: () => router.replace("/settings"),
          selected: router.route.includes("/settings"),
        },
        {
          permission: ENTITIES.Web,
          text: "Logout",
          icon: (<IoMdExit />),
          onClick: () => router.replace("/logout"),
          selected: router.route.includes("/logout"),
        },
      ]}
    />
  );
};
