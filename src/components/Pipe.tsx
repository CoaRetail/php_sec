import type { PipeNode } from "@/data/types";

export default function Pipe({ nodes, loop }: { nodes: PipeNode[]; loop?: string }) {
  return (
    <>
      <ol className="pipe">
        {nodes.map((n, i) => (
          <li className="pnode" key={i}>
            <span className="pnode__no">{i + 1}</span>
            <b>{n.label}</b>
            {n.sub && <small>{n.sub}</small>}
            {n.chips && (
              <span className="pchips">
                {n.chips.map((c) => {
                  const miss = c.startsWith("!");
                  return <i key={c} className={"pchip" + (miss ? " pchip--miss" : "")}>{miss ? c.slice(1) : c}</i>;
                })}
              </span>
            )}
          </li>
        ))}
      </ol>
      {loop && <p className="ploop">↻ {loop}</p>}
    </>
  );
}
