import { visit } from "unist-util-visit";

// Plugin remark maison pour préserver le design Fatturi :
//  - `> [!NOTE] Titre` (alertes façon GitHub) → encadré "callout" (aside.fatturi-callout)
//  - `> citation` classique → bloc citation stylé (blockquote.fatturi-quote)
//    avec, en option, une dernière ligne `— Auteur` transformée en <cite>
//  - liens externes (http/https) ouverts dans un nouvel onglet
//
// Le rendu final est stylé via .fatturi-* dans app/globals.css.

const ALERT_RE = /^\s*\[!(\w+)\]\s*(.*)$/;
const CITE_RE = /^\s*(—|--)\s*/;

interface MdNode {
  type: string;
  value?: string;
  url?: string;
  children?: MdNode[];
  data?: {
    hName?: string;
    hProperties?: Record<string, unknown>;
  };
}

function setData(node: MdNode, hName: string, className?: string) {
  node.data = node.data ?? {};
  node.data.hName = hName;
  if (className) {
    node.data.hProperties = { ...(node.data.hProperties ?? {}), className };
  }
}

export function remarkFatturi() {
  return (tree: MdNode) => {
    // Liens externes → nouvel onglet.
    visit(tree, "link", (node: MdNode) => {
      const url = node.url ?? "";
      if (/^https?:\/\//i.test(url)) {
        node.data = node.data ?? {};
        node.data.hProperties = {
          ...(node.data.hProperties ?? {}),
          target: "_blank",
          rel: "noopener noreferrer",
        };
      }
    });

    visit(tree, "blockquote", (node: MdNode) => {
      const children = node.children ?? [];
      const firstPara = children[0];
      const firstText = firstPara?.children?.[0];

      // Callout : première ligne du type [!NOTE] Titre.
      if (firstText?.type === "text" && typeof firstText.value === "string") {
        const firstLine = firstText.value.split("\n", 1)[0];
        const match = ALERT_RE.exec(firstLine);
        if (match) {
          const title = (match[2] || "À retenir").trim();
          firstText.value = firstText.value.slice(firstLine.length).replace(/^\n/, "");
          if (firstText.value === "") firstPara.children!.shift();

          const titleNode: MdNode = {
            type: "paragraph",
            data: { hName: "p", hProperties: { className: "fatturi-callout-title" } },
            children: [{ type: "text", value: title }],
          };
          children.unshift(titleNode);
          setData(node, "aside", "fatturi-callout");
          return;
        }
      }

      // Citation classique.
      setData(node, "blockquote", "fatturi-quote");

      const lastPara = children[children.length - 1];
      const lastChild = lastPara?.children?.[lastPara.children.length - 1];
      if (lastChild?.type === "text" && typeof lastChild.value === "string") {
        const lines = lastChild.value.split("\n");
        const citeIdx = lines.findIndex((l) => CITE_RE.test(l));
        if (citeIdx !== -1) {
          const citeText = lines[citeIdx].replace(CITE_RE, "").trim();
          lastChild.value = lines.slice(0, citeIdx).join("\n").replace(/\n+$/, "");
          if (lastChild.value === "") lastPara!.children!.pop();
          children.push({
            type: "paragraph",
            data: { hName: "cite", hProperties: { className: "fatturi-cite" } },
            children: [{ type: "text", value: citeText }],
          });
        }
      }
    });
  };
}
