import { Drawer } from '@mantine/core';

type LogsDrawerProps = {
    toggle: boolean, 
    onRemove: ()=>void
}


export default function LogsDrawer(props: LogsDrawerProps) {
  const logsPlaceHolder = "This Space reserved for logs"

  return (
    <>
      <Drawer
        position="right"
        opened={props.toggle}
        onClose={() => props.onRemove()}
        title="Logs"
        padding="xl"
        size="40%"
      >
        {logsPlaceHolder}
      </Drawer>
    </>
  );
}