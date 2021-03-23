interface ITemplateVariables {
   [key: string]: string | number;
}

export default interface IParseMailTemplateDTO {
   templates: string;
   variables: ITemplateVariables;
}
