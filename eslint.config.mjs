import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  {
    ignores: [".next/**", "node_modules/**", "next-env.d.ts"],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    // eslint-plugin-react-hooks v6 (enabled by Next 16) adds purity/refs
    // rules that flag intentional patterns in our react-three-fiber scenes:
    // Math.random() inside useMemo for procedural geometry, and ref reads
    // while building meshes. Keep them visible as warnings instead of errors.
    rules: {
      "react-hooks/purity": "warn",
      "react-hooks/refs": "warn",
    },
  },
];

export default eslintConfig;
