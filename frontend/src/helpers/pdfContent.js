export const generateTableContent = (tableBody) => [{
  table: {
    headerRows: 2,
    widths: [ 14, 64, '*', 20, 18, 18, 18, 18, 18, 48 ],
    body: tableBody,
  },
  style: ['tableText'],
}];

export const styles = {
  styles: {
    boldText: {
      bold: true,
      fontSize: 14,
    },
    centeredText: {
      alignment: 'center',
    },
    lineHeightBigger: {
      lineHeight: 1.4,
    },
    lineHeightBig: {
      lineHeight: 1.8,
    },
    textSmall: {
      fontSize: 6,
    },
    tableText: {
      fontSize: 8,
    }
  },
  defaultStyle: {
    font: 'Roboto',
    fontSize: 10,
  }
};

export const generalFileDefinition = {
  pageSize: 'A4',
  pageOrientation: 'portrait',
  pageMargins: [20, 20, 20, 20],
  info: {
    title: 'Inwentaryzacja',
    author: 'Inwentaryzator',
    // subject: 'subject of document',
    // keywords: 'keywords for document',
  },
};

export const companyNameContent = [{
  columns: [
    {
      width: '30%',
      stack: [
        { text: '.............................................' },
        { text: '(pieczęć/dane firmy)', style: 'textSmall' },
      ],
      margin: [ 0, 48, 0, 0 ],
      alignment: 'center',
    }
  ],
}];

export const fileHeaderContent = [{
  stack: [
    { text: 'SPIS Z NATURY', style: [ 'boldText', 'centeredText', 'lineHeightBigger' ] },
    { text: 'na dzień .............................', style: [ 'centeredText' ] },
  ]
}];

export const preTableContent = [{
  stack: [
    {
      text: 'Rodzaj spisu (okoliczności): ................................................................................................... ',
      style: [ 'lineHeightBig' ],
    },
    {
      text: 'Przedmiot spisu: ................................................... ',
      style: [ 'lineHeightBig' ],
    },
    {
      text: 'Spis rozpoczęto dnia .................... o godz. .................. ',
      style: [ 'lineHeightBig' ],
    },
  ],
  margin: [ 24, 36, 24, 18 ],
}];

export const ownersSignature = [{
  columns: [
    { width: '70%', text: '' },
    {
      width: '*',
      stack: [
        { text: '.................................................' },
        { text: '(podpis właściciela zakładu)', style: 'textSmall' },
      ],
      alignment: 'center',
    }
  ],
}];
