export const TRANSITION_DUARAION = 300;

export enum ERRORS_CODES {
  VALUES_NEEDED,
}

export const isMenuHiddenLinkParamsId: string =
  process.env.IS_MENU_HIDDEN_LINK_NAME || '';

export const isBackButtonDisabledLinkParamsId: string =
  process.env.IS_BACK_BUTTON_DISABLED_NAME || '';

export enum ORDER_PATH_PARTS {
  ORDER,
  DETAILS,
  GARMENT,
  GROUP,
  SUBGROUP,
}
