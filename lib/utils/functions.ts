import moment from 'moment';

export const fileToApiSupportFile = (file: any) => {
  let imageContent: any;
  if (file) {
    let fileName = file?.fileName;
    let fileType: string = 'png';
    if (!fileName && file.uri) {
      const nameArr = file.uri?.split('.');
      fileType = nameArr && nameArr[nameArr.length - 1];
      fileName = `${moment()
        .format('YYYY-MM-DDHH:mm:ss')
        .toString()}.${fileType}`;
    }
    imageContent = {
      uri: file.uri,
      name: fileName,
      type: `image/${fileType}`,
    };
  }

  return imageContent;
};
