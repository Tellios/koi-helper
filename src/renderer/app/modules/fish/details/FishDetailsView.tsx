import * as React from "react";
import { useAppState } from "app/state";
import { RouteComponentProps } from "react-router";
import { InfoPanel } from "./InfoPanel";

export const FishDetailsView: React.FunctionComponent<
  RouteComponentProps<{ fishId: string }>
> = ({ match }) => {
  const { state } = useAppState();
  const fish = state.fishes.filter(fish => fish.id === match.params.fishId)[0];

  return <InfoPanel fish={fish} />;
};
