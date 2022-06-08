import { takeLatest, all, call, put } from "typed-redux-saga/macro";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from "./category.action";

import { CATEGORY_ACTION_TYPES } from "./category.types";

// this here is a "saga", with put() it puts actions back into the reducer
export function* fetchCategoriesAsync() {
  try {
    // call turns the function into a generator effect
    const categoriesArray = yield* call(getCategoriesAndDocuments);
    yield* put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    console.log(error);
    yield* put(fetchCategoriesFailed(error as Error));
  }
}

export function* onFetchCategories() {
  yield* takeLatest(
    CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  yield* all([call(onFetchCategories)]);
}
