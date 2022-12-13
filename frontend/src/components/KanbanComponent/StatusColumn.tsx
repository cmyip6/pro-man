import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
    Card,
    Group,
    Modal,
    ScrollArea,
    Text,
    ThemeIcon,
    UnstyledButton,
    createStyles,
} from "@mantine/core";
import { IconGripVertical, IconPlus } from "@tabler/icons";
import { useState } from "react";
import { useAppSelector } from "../../store";
import { ItemCard } from "./ItemCard";

export type Item = {
    itemId: string;
    people: string;
    name: string;
};

type StatusProps = {
    projectId: number;
    statesName: string;
    color: string;
};

const useStyles = createStyles((theme, color: string) => ({
    cardHeader: {
        align: "center",
        cursor: "grab",
        backgroundColor: color,

        "&": {
            ".grip": {
                opacity: 0,
                transition: "opacity",
            },
        },

        "&:hover": {
            ".grip": {
                opacity: 1,
            },
        },
    },
}));

export function StatusColumn(props: StatusProps) {
    const [opened, setOpened] = useState(false);

    const { classes, theme } = useStyles(props.color);

    const projectSummary = useAppSelector((state) => state.table.summary);
    const targetProjectId = useAppSelector((state) => state.project.project_id);
    const allItemsInfo = projectSummary.filter(
        (project) =>
            project.project_id === targetProjectId &&
            project.type_name === "status"
    );
    const itemsUnderSameState = allItemsInfo.filter(
        (item) => item.item_status_name === props.statesName
    );

    console.log(itemsUnderSameState);

    const itemList = [];
    for (let item of itemsUnderSameState) {
        const date = item.item_dates_datetime.slice(0, 10);
        const obj = {
            itemName: item.item_name,
            memberName: item.item_person_name,
            itemDate: date,
        };

        itemList.push(obj);
    }

    const handleDnd = (event: DragEndEvent) => {
        const { active, over } = event;
    };

    return (
        <DndContext>
            <Card
                shadow="md"
                pt={20}
                pb={10}
                pr={6}
                pl={6}
                radius="md"
                withBorder
                mt={15}
                mr={6}
                w={290}
            >
                <div className={classes.cardHeader}>
                    <Group position="left" pb={10} m={5}>
                        <IconGripVertical className="grip" size={20} />
                        <Text weight={500}>
                            {props.statesName} / {itemList.length}
                        </Text>
                    </Group>
                </div>

                <ScrollArea
                    style={{ height: 750 }}
                    type="auto"
                    scrollbarSize={6}
                >
                    <div>
                        {itemList.map((status) => (
                            <ItemCard
                                itemName={status.itemName}
                                memberName={status.memberName}
                                itemDate={status.itemDate}
                            />
                        ))}
                    </div>
                </ScrollArea>

                <UnstyledButton onClick={() => setOpened(true)}>
                    <Group position="left" m="sm" mb={5}>
                        <ThemeIcon variant="light" radius="xl" color="gray">
                            <IconPlus />
                        </ThemeIcon>
                        <Text color="dimmed">Add Item</Text>
                    </Group>
                </UnstyledButton>

                <>
                    <Modal
                        opened={opened}
                        onClose={() => setOpened(false)}
                        title="Item"
                        size={600}
                    >
                        <Group position="center" mb={6}></Group>
                    </Modal>
                </>
            </Card>
        </DndContext>
    );
}
