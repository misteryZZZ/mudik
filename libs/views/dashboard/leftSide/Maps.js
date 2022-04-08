import React from 'react';

const Maps = () => (
  <div className="rounded-lg overflow-hidden grow min-h-[300px] flex flex-col">
    <iframe className="grow" width="100%" height="100%" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=100%&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
  </div>
)

export default Maps;