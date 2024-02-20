import { Breadcrumbs, Anchor } from "@mantine/core";
export function Breadcrumb({ data }) {
  const rows = data.map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  return <Breadcrumbs>{rows}</Breadcrumbs>;
}
