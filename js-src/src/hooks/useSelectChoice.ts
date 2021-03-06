import { EntityId } from "@reduxjs/toolkit";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { selectChoice } from "../state/redux/actions/storyActions";

interface SelectChoiceOptions {
  continueMaximally?: boolean;
}
export function useSelectChoiceId(
  choiceId: EntityId,
  { continueMaximally: outerMax }: SelectChoiceOptions = {}
) {
  const dispatch = useDispatch();
  return useCallback(
    ({ continueMaximally: innerMax = outerMax }: SelectChoiceOptions = {}) => {
      dispatch(
        selectChoice({
          choiceId: choiceId,
          maximally: innerMax ?? true,
        })
      );
    },
    [outerMax, choiceId]
  );
}

export function useSelectChoiceIndex(
  choiceIndex: number,
  { continueMaximally: outerMax }: SelectChoiceOptions = {}
) {
  const dispatch = useDispatch();
  return useCallback(
    ({ continueMaximally: innerMax = outerMax }: SelectChoiceOptions = {}) => {
      dispatch(
        selectChoice({
          choiceIndex,
          maximally: innerMax ?? true,
        })
      );
    },
    [outerMax, choiceIndex]
  );
}
