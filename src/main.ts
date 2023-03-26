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

let complexity = 1;

/**
 * Function to visit each node in the AST recursively
 * @param {ts.Node} node - The node to visit
 */
const visitNode = (node: ts.Node) => {
  switch (node.kind) {
    case ts.SyntaxKind.IfStatement:
    case ts.SyntaxKind.ForInStatement:
    case ts.SyntaxKind.ForOfStatement:
    case ts.SyntaxKind.ForStatement:
    case ts.SyntaxKind.WhileStatement:
    case ts.SyntaxKind.TryStatement:
    case ts.SyntaxKind.CatchClause:
      complexity += 1;
    case ts.SyntaxKind.SwitchStatement:
      const switchStmt = node as ts.SwitchStatement;
      switchStmt.caseBlock.clauses.forEach((clause) => {
        if (ts.isCaseClause(clause)) {
          complexity += 1;
        }
      });
  }

  ts.forEachChild(node, visitNode);
};

ts.forEachChild(tmpSourceFile, visitNode);
