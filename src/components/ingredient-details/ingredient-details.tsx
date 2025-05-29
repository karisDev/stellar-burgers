import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from 'src/services/store';
import { getIngredientsSelector } from 'src/services/ingredients/slice';
import { Modal } from '../modal';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const ingredientData = useSelector(getIngredientsSelector).find(
    (item) => item._id === id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return (
    <Modal title={'Детали ингредиента'}>
      <IngredientDetailsUI ingredientData={ingredientData} />
    </Modal>
  );
};
