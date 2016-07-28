export function get_xlsx(data, ws_name) {
  /* set up workbook objects -- some of these will not be required in the future */
  var wb = {};
  wb.Sheets = {};
  wb.Props = {};
  wb.SSF = {};
  wb.SheetNames = [];

  /* create worksheet: */
  const ws = {};

  /* the range object is used to keep track of the range of the sheet */
  const range = {s: {c:0, r:0}, e: {c:0, r:0 }};

  /* Iterate through each element in the structure */
  for(let R = 0; R !== data.length; ++R) {
    if(range.e.r < R) {
      range.e.r = R;
    }

    for(let C = 0; C !== data[R].length; ++C) {
      if(range.e.c < C) {
        range.e.c = C;
      }

      /* create cell object: .v is the actual data */
      const cell = { v: data[R][C] };
      if(cell.v == null) {
        continue;
      }

      /* create the correct cell reference */
      const cell_ref = XLSX.utils.encode_cell({c:C,r:R}); // jshint ignore:line

      /* determine the cell type */
      if(typeof cell.v === 'number') {
        cell.t = 'n';
      } else if(typeof cell.v === 'boolean') {
        cell.t = 'b';
      } else {
        cell.t = 's';
      }

      /* add to structure */
      ws[cell_ref] = cell;
    }
  }
  ws['!ref'] = XLSX.utils.encode_range(range); // jshint ignore:line

  /* add worksheet to workbook */
  wb.SheetNames.push(ws_name);
  wb.Sheets[ws_name] = ws;

  const wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: false, type: 'binary'}); // jshint ignore:line

  function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (var i = 0; i !== s.length; ++i) {
      view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
  }

  return new Blob([s2ab(wbout)], {type: ""});
}
