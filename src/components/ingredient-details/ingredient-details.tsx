import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'src/services/store';
import { getIngredientsSelector } from 'src/services/ingredients/slice';
import { Modal } from '../modal';

import styles from './ingredient-details.module.css';

export const IngredientDetails: FC<{ asModal?: boolean }> = ({ asModal }) => {
  const { id } = useParams();
  const location = useLocation();
  const ingredientData = useSelector(getIngredientsSelector).find(
    (item) => item._id === id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  const Wrapper = asModal ? Modal : 'div';

  return (
    <Wrapper title={'Детали ингредиента'} className={styles.content}>
      {!asModal && (
        <h3 className={`${styles.header} text text_type_main-large`}>
          Детали ингредиента
        </h3>
      )}
      <IngredientDetailsUI ingredientData={ingredientData} />
    </Wrapper>
  );
};
