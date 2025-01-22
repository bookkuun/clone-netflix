import { useProps } from "./useProps";
import { Layout } from "./Layout";

export const Banner = () => {
  const { movie, truncate } = useProps();
  return <Layout movie={movie} truncate={truncate} />;
};
