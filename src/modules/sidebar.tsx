import { useState } from "react";
import {
  Navbar,
  Center,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
} from "@mantine/core";
import {
  TablerIcon,
  IconUser,
  IconWorld,
  IconGraph,
  IconCreativeCommonsZero,
} from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.colorScheme === "dark" ? "#FFFFFF" : "#FFFFFF",

    "&:hover": {
      backgroundColor: "black",
    },
  },

  active: {
    "&, &:hover": {
      backgroundColor: "#4743c5",
      color: "white",
    },
  },
}));

interface NavbarLinkProps {
  icon: TablerIcon;
  label: string;
  active?: boolean;
  onClick?(): void;
}
function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionDuration={0}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}>
        <Icon stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconGraph, label: "Graph" },
  { icon: IconUser, label: "Team" },
  { icon: IconWorld, label: "World" },
];

export function SideBar() {
  const [active, setActive] = useState(2);

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  return (
    <Navbar
      height={"100%"}
      width={{ base: 80 }}
      p="md"
      className={"!z-[10000]"}
      color={"white"}
      bg={"#6865f1"}>
      <Center>
        <IconCreativeCommonsZero />
      </Center>
      <Navbar.Section grow mt={50} className={"white"}>
        <Stack justify="center" spacing={0}>
          {links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
          <NavbarLink icon={IconUser} label="Change account" />
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}
