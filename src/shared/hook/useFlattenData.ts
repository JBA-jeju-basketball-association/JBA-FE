export const useFlattenData = () => {
  const flattenDatas = (datas: any) => {
    return datas?.map((data: any) => ({
      ...data,
      files: data.files.map((file: any) => file.fileUrl),
    }));
  };
  return flattenDatas;
};
