import moment from "moment";
export const Formatnumber = (value: number | null) => {
  if (value) {
    return value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return "0";
  }
};

export const FormatDatetime = (value: Date | string | null) => {
  if (!value) return;

  const res = moment(value).format("DD-MM-YYYY DD:HH:ss");
  return res;
};

export const PushPath = (path: string) => {
  if (!path) return;

  const router = useRouter();
  return router.push(path);
};
