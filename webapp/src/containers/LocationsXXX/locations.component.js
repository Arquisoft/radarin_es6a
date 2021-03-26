import React from 'react';
import { Uploader } from '@inrupt/solid-react-components';
import { Trans, useTranslation } from 'react-i18next';
import {
  LocationsWrapper,
  LocationsCard,
  LocationsLogo,
  LocationsProfile,
  LocationsDetail,
  LocationsName,
  ImageWrapper
} from './locations.style';
import { ImageProfile } from '@components';
import { errorToaster } from '@utils';

/**
 * Locations Page UI component, containing the styled components for the Locations Page
 * Image component will get theimage context and resolve the value to render.
 * @param props
 */
export const LocationsPageContent = props => {
  const { webId, image, updatePhoto, name } = props;
  const { t } = useTranslation();
  const limit = 2100000;
  return (
    <LocationsWrapper data-testid="locations-wrapper">
      <LocationsCard className="card">
        <LocationsLogo data-testid="locations-logo">
          <img src="/img/logo.svg" alt="Inrupt" />
        </LocationsLogo>
        <LocationsProfile data-testid="locations-profile">
          <h3>
            {t('locations.locations')}, <LocationsName>{name}</LocationsName>
          </h3>
          <ImageWrapper>
            <Uploader
              {...{
                fileBase: webId && webId.split('/card')[0],
                limitFiles: 1,
                limitSize: limit,
                accept: 'jpg,jpeg,png',
                errorsText: {
                  sizeLimit: t('locations.errors.sizeLimit', {
                    limit: `${limit / 1000000}Mbs`
                  }),
                  unsupported: t('locations.errors.unsupported'),
                  maximumFiles: t('locations.errors.maximumFiles')
                },
                onError: error => {
                  if (error && error.statusText) {
                    
                    errorToaster(error.statusText, t('locations.errorTitle'));
                  }
                },
                onComplete: uploadedFiles => {
                  updatePhoto(
                    uploadedFiles[uploadedFiles.length - 1].uri,
                    t('locations.uploadSuccess'),
                    t('locations.successTitle')
                  );
                },
                render: props => (
                  <ImageProfile
                    {...{
                      ...props,
                      webId,
                      photo: image,
                      text: t('locations.upload'),
                      uploadingText: t('locations.uploadingText')
                    }}
                  />
                )
              }}
            />
          </ImageWrapper>
        </LocationsProfile>
      </LocationsCard>
      <LocationsCard className="card">
        <LocationsDetail data-testid="locations-detail">
          <Trans i18nKey="locations.title">
            <h3>
              title
              
            </h3>
          </Trans>
          <Trans i18nKey="locations.description">
            <p>
              text
              
            </p>
          </Trans>
          

          
          
          
         
        </LocationsDetail>
      </LocationsCard>
    </LocationsWrapper>
  );
};
