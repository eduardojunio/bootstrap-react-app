function isPascalCase(answer) {
  const valid = /^[A-Z][a-z]*(?:[A-Z][a-z]*)*$/.test(answer);
  return valid || 'It must be in PascalCase (e.g. MyFeature).';
}

function pascalToKebab(pascalString) {
  return pascalString
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

function pascalToCamel(pascalString) {
  return pascalString[0].toLowerCase() + pascalString.slice(1);
}

export default function (plop) {
  plop.setGenerator('feature', {
    description: 'Add an empty feature.',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Type the name of the feature (e.g. MyFeature):',
        validate: isPascalCase,
      },
    ],
    actions: [
      function addData(answers) {
        answers.routePath = pascalToKebab(answers.name);
        answers.nameCamel = pascalToCamel(answers.name);
        return 'Computed data based on answers.';
      },
      {
        type: 'add',
        path: 'src/{{name}}/routes.tsx',
        templateFile: 'templates/feature/routes.hbs',
      },
      {
        type: 'modify',
        path: 'src/routes.tsx',
        pattern: /^.*RoutesInstructions.*\s/gm,
        template: '',
      },
      {
        type: 'modify',
        path: 'src/routes.tsx',
        pattern: /(^import .* from .*$)/m,
        template: "$1\nimport { routes as {{name}}Routes } from './{{name}}/routes.tsx';",
      },
      {
        type: 'modify',
        path: 'src/routes.tsx',
        pattern: /(\s*<\/Route>)/,
        template: `\n    {{name}}Routes$1`,
      },
      {
        type: 'modify',
        path: 'src/routes.tsx',
        pattern: /^\s*(.*Routes)$/m,
        template: '    {$1}',
      },
      {
        type: 'modify',
        path: 'src/Shared/Services/Path/Path.ts',
        pattern: /^\s*sampleFeature: {},\s$/m,
        template: '',
      },
      {
        type: 'modify',
        path: 'src/Shared/Services/Path/Path.ts',
        pattern: /(\n};)/,
        template: "\n  {{nameCamel}}: {\n    list: '/{{routePath}}',\n  },$1",
      },
    ],
  });
}
