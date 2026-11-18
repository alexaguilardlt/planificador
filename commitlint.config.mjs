// Mensajes de commit con formato Conventional Commits:
//   tipo(ámbito): descripción en minúscula
// Ejemplo: feat(api): añadir endpoint de asignaturas
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Ámbitos permitidos: cada parte del monorepo y lo transversal
    'scope-enum': [2, 'always', ['api', 'web', 'planner', 'repo', 'ci', 'deps', 'docs']],
    // Avisa (sin bloquear) si falta el ámbito
    'scope-empty': [1, 'never'],
  },
}
