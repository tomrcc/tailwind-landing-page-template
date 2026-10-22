import { blockMap } from "@/app/cloudcannon/componentMap";

export default function Blocks({ blocks }: { blocks: { _type: string }[] }) {
  return (
    <div
      data-editable="array"
      data-prop="content_blocks"
      data-component-key="_type"
    >
      {blocks.map((block, index) => {
        const Block = blockMap[block._type];
        if (!Block) throw new Error(`No block component for _type "${block._type}"`);
        return (
          <div key={index} data-editable="array-item" data-component={block._type}>
            <Block {...block} />
          </div>
        );
      })}
    </div>
  );
}
