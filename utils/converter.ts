export function convertObjectToUriQuery(obj: any) {
  const str = [];
  if (typeof obj === 'object') {
    for (const p in obj)
      if (obj.hasOwnProperty(p) && obj[p] !== '' && typeof obj[p] !== 'undefined') {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
  }

  return '?' + str.join('&');
}

export function convertStringToJson(jsonString: any): any {
  // if not stringified json rather a simple string value then JSON.parse will throw error
  // otherwise continue recursion
  if (typeof jsonString === 'string') {
    if (!isNaN(Number(jsonString))) {
      // if a numeric string is received, return itself
      // otherwise JSON.parse will convert it to a number
      return jsonString;
    }
    try {
      return convertStringToJson(JSON.parse(jsonString));
    } catch (err) {
      return jsonString;
    }
  } else if (Array.isArray(jsonString)) {
    // if an array is received, map over the array and deepParse each value
    return jsonString.map((val: string) => convertStringToJson(val));
  } else if (typeof jsonString === 'object' && jsonString !== null) {
    // if an object is received then deepParse each element in the object
    // typeof null returns 'object' too, so we have to eliminate that
    return Object.keys(jsonString).reduce((obj: any, key) => {
      obj[key] = convertStringToJson(jsonString[key]);
      return obj;
    }, {});
  } else {
    // otherwise return whatever was received
    return jsonString;
  }
}

export function convertNumberToVND(number: number) {
  if (typeof number !== 'number') return String(number);
  const money = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(number);
  return money;
}

export function convertLocalFileToUrl(file: File) {
  return new Promise<ProgressEvent<FileReader>>((resl) => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      resl(ev);
    };
    reader.readAsDataURL(file);
  });
}

export function convertIndexToSTT(
  page: number,
  rowsPerPage: number,
  index: number,
  firstPage: number = 0,
) {
  return rowsPerPage * (page - firstPage) + index;
}
