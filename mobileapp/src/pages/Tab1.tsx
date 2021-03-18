import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import React from "react";
import GeolocationButton from "../components/GeoButton";

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Geolocation</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Geolocation</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="container">
          <GeolocationButton />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
