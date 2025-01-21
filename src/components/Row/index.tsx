import axiosClient from "../../axios";

export const Row = ({ fetchUrl }: { fetchUrl: string }) => {
  async function fetchData() {
    const request = await axiosClient.get(fetchUrl);
    console.log(request.data);
  }

  fetchData();

  return <div className="Row" />;
};
