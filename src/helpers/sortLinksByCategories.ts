import { ObjectCategoryType } from '../types/ObjectCategoryType';

export const sortLinksByCategories = ( links:any ) => {
    const arrayCategories:any = [];

      links.map((item:any) => {
          arrayCategories.push(item.category);
      });
  
      return arrayCategories.map((item:any) => {
        const result = links.filter((obj:any) => {
          
          const cat:ObjectCategoryType = obj.category;
          
          return cat._id === item._id
          
        });
        if(result.length > 0) {
          item.links = result;
        }
      });
}