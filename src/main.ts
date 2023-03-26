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

const tmpSourceFile = ts.createSourceFile('temp.ts', typescriptCode, ts.ScriptTarget.Latest, true);

ts.forEachChild(tmpSourceFile, node => {
  if (ts.isFunctionDeclaration(node)) {
    console.log(node.name);
  }
})