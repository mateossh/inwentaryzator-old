export const app = (state = {}, action) => {
  switch (action.type) {
  case 'SET_BACKEND_HEALTH':
    return {
      ...state,
      health: action.health,
    };
  case 'SET_CURRENT_VIEW':
    return {
      ...state,
      view: action.view,
    };
  case 'SET_VIEW_COMPONENT':
    return {
      ...state,
      component: action.component,
    };
  case 'SET_PDF_FORM_VISIBILITY':
    return {
      ...state,
      pdfFormVisibility: action.pdfFormVisibility,
    };
  case 'SET_ADD_FORM_VISIBILITY':
    return {
      ...state,
      addFormVisibility: action.addFormVisibility,
    };
  case 'SET_EDIT_FORM_VISIBILITY':
    return {
      ...state,
      editFormVisibility: action.editFormVisibility,
      editFormProductCode: action.editFormProductCode,
    };
  case 'SET_PDF_MEMBERS_COUNT':
    return {
      ...state,
      pdfMembersCount: action.pdfMembersCount,
    };
  case 'SET_PDF_PAGINATION_ALIGNMENT':
      return {
        ...state,
        pdfPaginationAlignment: action.pdfPaginationAlignment,
      };
  default:
    return state;
  }
};
