export interface Theme {
  id: string; applyId: string; icon: string; cls: string; label: string; indexLabel: string;
  card: string; quote: string; tags: string[]; h2: string; intro: string;
  flow: string[]; steps: string[]; outcomes: string[]; notes: string[]; cta: string;
}
export interface PipeNode { label: string; sub?: string; chips?: string[] } // chips の先頭 "!" は「欠けた要素」
export interface Info { title: string; nodes: PipeNode[]; loop: string; legend: boolean }
