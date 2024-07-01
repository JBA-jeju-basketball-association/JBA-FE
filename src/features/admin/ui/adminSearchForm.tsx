// AdminSearchForm.tsx
import React, { useState } from "react";
import { AdminBasicForm } from "entities/admin";
import Button from "shared/ui/button//index";
import styles from "./AdminSearchForm.module.css";
import { AdminSearchFormProps } from "shared/type/AdminType";

export const AdminSearchForm = ({
  gallerySearchCriteria,
  label,
  showCategory,
}: AdminSearchFormProps) => {
  const [selectedCategory, setSelectedCategory] = useState(
    gallerySearchCriteria[0]
  );

  return (
    <div className={styles.container}>
      <div className={styles.basicForm}>
        {/* <AdminBasicForm
          categories={gallerySearchCriteria}
          label={label[0]}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <AdminBasicForm
          label={label[2]}
          showCategory={false}
          value={searchTerm}
          onChange={setSearchTerm}
        /> */}
      </div>
      <div className={styles.button}>
        <Button>검색</Button>
        <Button>초기화</Button>
      </div>
    </div>
  );
};

// import React, { useState } from "react";
// import { AdminBasicForm } from "entities/admin";
// import Button from "shared/ui/button//index";
// import styles from "./AdminSearchForm.module.css";
// import { AdminSearchFormProps } from "shared/type/AdminType";

// export const AdminSearchForm = ({
//   categories,
//   label,
// }: AdminSearchFormProps) => {
//   const [selectedCategories, setSelectedCategories] = useState([
//     categories[0][0],
//     categories[1][0],
//   ]);

//   const handleResetCategory = () => {
//     setSelectedCategories([categories[0][0], categories[1][0]]);
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.basicForm}>
//         <AdminBasicForm
//           categories={categories[0]}
//           label={label[0]}
//           selectedCategory={selectedCategories[0]}
//           setSelectedCategory={(category: any) =>
//             setSelectedCategories([category, selectedCategories[1]])
//           }
//         />
//         <AdminBasicForm
//           categories={categories[1]}
//           label={label[1]}
//           selectedCategory={selectedCategories[1]}
//           setSelectedCategory={(category: any) =>
//             setSelectedCategories([selectedCategories[0], category])
//           }
//         />
//         <AdminBasicForm label={label[2]} showCategory={false} />
//       </div>
//       <div className={styles.button}>
//         <Button>검색</Button>
//         <Button onClick={handleResetCategory}>초기화</Button>
//       </div>
//     </div>
//   );
// };
