import ts from 'typescript';
import fs from 'fs';

const args = process.argv.slice(2);
const fileToRead = args[0];

const fileContent = fs.readFileSync(fileToRead, 'utf8');
const tmpSourceFile = ts.createSourceFile(
  'tmp.ts',
  fileContent,
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
    case ts.SyntaxKind.ConditionalExpression:
      complexity += 1;
      break;
    case ts.SyntaxKind.SwitchStatement:
      const switchStmt = node as ts.SwitchStatement;
      switchStmt.caseBlock.clauses.forEach((clause) => {
        if (ts.isCaseClause(clause)) {
          // handle only case clausa, because it is not allowed to have a switch inside another
          complexity += 1;
        }
      });
      break;
    case ts.SyntaxKind.BinaryExpression:
      const binaryExpr = node as ts.BinaryExpression;
      if (
        binaryExpr.operatorToken.kind ==
          ts.SyntaxKind.AmpersandAmpersandToken ||
        binaryExpr.operatorToken.kind == ts.SyntaxKind.BarBarToken
      ) {
        // if the binary expression token is AND or OR, it is an assertion branch
        // so it increases the complexity in +1
        complexity += 1;
      }
      break;
  }

  ts.forEachChild(node, visitNode);
};

visitNode(tmpSourceFile);
console.log(complexity);
