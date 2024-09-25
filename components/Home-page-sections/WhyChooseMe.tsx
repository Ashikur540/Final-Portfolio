import { gridItems } from "@/data";
import { BentoGrid, BentoGridItem } from "../ui/BentoGrid";

export function WhyChooseMe() {
  return (
    <section id="#about" className="py-20">
      <BentoGrid className="w-full py-20">
        {gridItems.map(({ className, id, description, title }) => (
          <BentoGridItem
            id={id}
            key={id}
            title={title}
            description={description}
            className={className}
            // header={item.header}
            // className={item.className}
            // icon={item.icon}
          />
        ))}
      </BentoGrid>
    </section>
  );
}
