import {
  createStyles,
  Header,
  Autocomplete,
  Group,
  Burger,
  Button,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconRun, IconSearch } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    position: "absolute",
  },

  inner: {
    height: 56,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  search: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },
}));

interface HeaderSearchProps {
  links: { link: string; label: string }[];
}

export function HeaderSearch({ links }: HeaderSearchProps) {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      onClick={(event) => event.preventDefault()}>
      {link.label}
    </a>
  ));

  return (
    <Header height={56} className={classes.header}>
      <div className={classes.inner}>
        <Group className={"ml-20"}>
          <button
            className={
              "text-black border-2 border-gray-200 p-2 rounded-md flex items-center gap-1"
            }>
            <IconRun className={"text-[#6765f1]"} /> Run
          </button>
          <button
            className={
              " text-white p-3 rounded-md flex items-center gap-1 bg-green-400"
            }>
            Save Changes
          </button>
        </Group>
        <Group>
          <pre className={"text-[#b1b9c3]"}>Use Case</pre> /{" "}
          <span className={"text-[#292b68]"}>My copy</span>
        </Group>

        <Group>
          <Group ml={50} spacing={5} className={classes.links}>
            {items}
          </Group>
          <Autocomplete
            className={classes.search}
            placeholder="Search"
            icon={<IconSearch size={16} stroke={1.5} />}
            data={[]}
          />
        </Group>
      </div>
    </Header>
  );
}
