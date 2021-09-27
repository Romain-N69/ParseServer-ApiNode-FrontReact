import React, { Component } from 'react';

type OwnProps = {
  appointmentID: string;
};

type DispatchProps = {};

type StateProps = {
  // appointment: Appointment | null;
};

type Props = OwnProps & DispatchProps & StateProps;

type State = {};

class AppointmentItemContainerClass extends Component<Props, State> {
  public state: State = {};

  public componentDidMount(): void {
    this.componentDidUpdate();
  }

  public componentDidUpdate(_prevProps?: Readonly<Props>): void {}

  public render(): React.ReactNode {
    const {} = this.props;

    // if (appointment === null) {
    //   return null;
    // }

    return <></>;
    // return (
    //   <AppointmentItemComponent appointment={appointment} isLastItem={false} />
    // );
  }
}

export const AppointmentItemContainer = AppointmentItemContainerClass;
