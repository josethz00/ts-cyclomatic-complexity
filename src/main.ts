import ts from 'typescript';

const typescriptCode = `
function exampleFunction(a: number, b: number): number {
  if (a > b) {
    return a;
  } else {
    return b;
  }
}
`;

const tmpSourceFile = ts.createSourceFile(
  'temp.ts',
  typescriptCode,
  ts.ScriptTarget.Latest,
  true,
);

/**
 * Function to visit each node in the AST recursively
 * @param {ts.Node} node - The node to visit
 */
const visitNode = (node: ts.Node) => {
  console.log(node.kind);
  ts.forEachChild(node, visitNode);
};

ts.forEachChild(tmpSourceFile, visitNode);
