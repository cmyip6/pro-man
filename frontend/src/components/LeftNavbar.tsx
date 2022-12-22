import React, { FC, useState } from "react";
import {
    Navbar,
    Tooltip,
    UnstyledButton,
    createStyles,
    Stack,
} from "@mantine/core";
import {
    IconGauge,
    IconBell,
    IconUser,
    IconStar,
    IconLogout,
    TablerIcon,
    IconUsers,
} from "@tabler/icons";
import { Logo, LogoProps } from "./Logo";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/auth/thunk";
import { useAppDispatch, useAppSelector } from "../store";
import { toggleFavoriteAction, toggleSidePanelAction } from "../redux/project/slice";

const useStyles = createStyles((theme) => ({
    link: {
        borderRadius: theme.radius.md,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: theme.white,
        opacity: 0.85,
        padding: 8,
        marginBottom: 30,

        "&:hover": {
            opacity: 1,
            backgroundColor: theme.fn.lighten(
                theme.fn.variant({
                    variant: "filled",
                    color: "violet",
                }).background!,
                0.1
            ),
        },
    },

    active: {
        opacity: 1,
        "&, &:hover": {
            backgroundColor: theme.fn.lighten(
                theme.fn.variant({
                    variant: "filled",
                    color: "violet",
                }).background!,
                0.15
            ),
        },
    },

}));

interface NavbarLinkProps {
    icon: TablerIcon | FC<LogoProps>;
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
                className={cx(classes.link, { [classes.active]: active })}
            >
                <Icon stroke={1.5} size={32} />
            </UnstyledButton>
        </Tooltip>
    );
}

const navButtons = [
    { icon: Logo, label: "Home", path: "/home" },
    { icon: IconBell, label: "Notification", path: "/notification"},
    { icon: IconUsers, label: "My Member", path: "/myMember" },
    { icon: IconStar, label: "Favorite", path: "favorite" }
];



export function LeftNavbar() {
    const [active, setActive] = useState(0);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const toggleSidePanel = useAppSelector(state=>state.project.toggle_side_panel)
    const toggleFavorite = useAppSelector(state=>state.project.toggle_favorite)
    const page = useAppSelector(state=>state.project.active_page)

    const iconLinks = navButtons.map((item, index) => (
        <NavbarLink
            {...item}
            key={item.label}
            active={index === active}
            onClick={() => {
                if (item.path === 'favorite'){
                    if (toggleSidePanel && !toggleFavorite){
                        setActive(index)
                        navigate(`/home/${page}`)
                        dispatch(toggleSidePanelAction(true))
                        dispatch(toggleFavoriteAction(true))
                    } else {
                        setActive(index)
                        navigate(`/home/${page}`)
                        dispatch(toggleFavoriteAction(!toggleFavorite))
                        dispatch(toggleSidePanelAction(!toggleSidePanel))
                    }
                } else {
                    setActive(index)
                    navigate(item.path);
                    dispatch(toggleSidePanelAction(false))
                    dispatch(toggleFavoriteAction(false))
                }
            }}
        />
    ));

    return (
        <Navbar
            width={{ base: 80 }}
            p="md"
            sx={(theme) => ({
                backgroundImage: theme.fn.gradient({ from: '#24285A', to: ' #6871DB', deg: 45 })
                })}
        >
            <Navbar.Section grow mt={50}>
                <Stack justify="center" spacing={0}>
                    {iconLinks}
                </Stack>
            </Navbar.Section>
            <Navbar.Section>
                <Stack justify="center" spacing={0}>
                    <NavbarLink icon={IconUser} label="Profile" onClick={()=>navigate("/profile")} />
                    <NavbarLink icon={IconLogout} label="Logout" onClick={()=>dispatch(logout())}/>
                </Stack>
            </Navbar.Section>
        </Navbar>
    );
}
