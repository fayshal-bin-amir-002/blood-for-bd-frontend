export const mapToValueLabel = (
  data: any[] | undefined,
  valueKey?: string,
  labelKey?: string
) => {
  if (valueKey && labelKey) {
    return (
      data?.map((item) => ({
        value: item[valueKey],
        label: item[labelKey],
      })) || []
    );
  } else {
    return (
      data?.map((item) => ({
        value: item,
        label: item,
      })) || []
    );
  }
};
