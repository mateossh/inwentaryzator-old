import pdfMake from 'pdfmake';
import pdfFonts from './vfsFonts';
import {
  styles,
  generalFileDefinition,
  companyNameContent,
  fileHeaderContent,
  preTableContent,
  ownersSignature,
  generateTableContent,
} from './pdfContent';
import { store } from '../store';
import {
  getIntegerPart,
  fractionalDigitsAsStr,
} from './utils';

export const PDFGenerator = ({ membersCount, paginationAlignment }) => {
  function generatePageFooter(currentPage, pageCount) {
    if (paginationAlignment !== 'none') {
      return [
        {
          text: `Strona ${currentPage} / ${pageCount}`,
          alignment: `${paginationAlignment}`,
          fontSize: 8,
        }
      ];
    }
    return [];
  }

  function participantsSignaturesPlaceholder() {
    const placeholder = [];

    for (let i = 0; i < membersCount; i++) {
      placeholder.push({
        columns: [
          {
            width: '40%',
            stack: [
              { text: '.........................................................' },
              { text: '(imię i nazwisko)', style: 'textSmall' },
            ],
            alignment: 'center',
          },
          {
            width: '4%',
            text: '—',
            alignment: 'center',
          },
          {
            width: '30%',
            stack: [
              { text: '...........................................' },
              { text: '(podpis)', style: 'textSmall' },
            ],
            alignment: 'center',
          }
        ],
        margin: [0, 8],
      });
    }

    return placeholder;
  }

  const postTableContent = [{
    stack: [
      {
        text: 'Spis zakończono dnia .............................. o godz. ............................. na pozycji .............................',
        style: ['lineHeightBig'],
      },
      {
        text: 'Wartość spisu z natury wynosi .............................. zł',
        style: ['lineHeightBig'],
      },
      {
        text: 'Osoby sporządzające spis:',
        style: ['lineHeightBig'],
      },
      {
        ol: [
          ...participantsSignaturesPlaceholder(),
        ],
      },
    ],
    margin: [24, 18, 24, 18],
  }];

  const generatePDF = () => {
    const newTableHeader = [
      [
        { text: 'L.p.', rowSpan: 2, alignment: 'center' },
        { text: 'Kod', rowSpan: 2, alignment: 'center' },
        { text: 'Nazwa', rowSpan: 2, alignment: 'center' },
        { text: 'Ilość', rowSpan: 2, alignment: 'center' },
        { text: 'J.M.', rowSpan: 2, alignment: 'center' },
        { text: 'Cena za szt.', colSpan: 2, alignment: 'center' },
        {},
        { text: 'Wartość', colSpan: 2, alignment: 'center' },
        {},
        { text: 'Uwagi', rowSpan: 2, alignment: 'center' }
      ],
      [
        { text: '' },
        { text: '' },
        { text: '' },
        { text: '' },
        { text: '' },
        { text: 'zł', alignment: 'center' },
        { text: 'gr', alignment: 'center' },
        { text: 'zł', alignment: 'center' },
        { text: 'gr', alignment: 'center' },
        { text: '' },
      ],
    ];
    const { products } = store.getState().stock;
    console.log('BLAHBLAHBLAH', products);

    for (let i = 0; i < products.length; i++) {
      const newItem = [];
      newItem.push(i + 1);
      newItem.push(products[i].Code);
      newItem.push(products[i].Name);
      newItem.push(products[i].Amount);
      newItem.push(products[i].MeasureUnit);
      newItem.push({ text: getIntegerPart(products[i].Price), alignment: 'right' });
      newItem.push({ text: fractionalDigitsAsStr(products[i].Price), alignment: 'right' });
      newItem.push({ text: getIntegerPart(products[i].TotalValue), alignment: 'right' });
      newItem.push({ text: fractionalDigitsAsStr(products[i].TotalValue), alignment: 'right' });
      newItem.push('');

      newTableHeader.push(newItem);
    }

    const definition = {
      ...styles,
      ...generalFileDefinition,
      footer: generatePageFooter,
      content: [
        ...companyNameContent,
        ...fileHeaderContent,
        ...preTableContent,
        ...generateTableContent(newTableHeader),
        ...postTableContent,
        ...ownersSignature,
      ],
    };

    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.createPdf(definition).download();
  };

  generatePDF();
};
