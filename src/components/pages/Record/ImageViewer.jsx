import React, { useEffect, useState } from "react";
import OpenSeaDragon from "openseadragon";

const ImageViewer = ({ object }) => {
  const [viewer, setViewer] = useState();

  useEffect(() => {
    if (object && viewer) {
      viewer.open();
    }
    // we only care about the object prop, ignore other dependencies
    // eslint-disable-next-line
  }, [object]);

  useEffect(() => {
    initOpenSeaDragon();

    return () => {
      // clean up by destroying this viewer when unmounting
      viewer && viewer.destroy();
    };
    // we only want to run this once, dont worry about other dependencies
    // eslint-disable-next-line
  }, []);

  const initOpenSeaDragon = () => {
    viewer && viewer.destroy();

    const tileSources = object.imageTiles.url.replace(
      "catalog.archives.gov/catalogmedia",
      "s3.amazonaws.com/NARAprodstorage"
    );

    const newViewer = OpenSeaDragon({
      id: "viewer",
      tileSources: tileSources,
      prefixUrl: "/images/openseadragon/",
    });

    setViewer(newViewer);
  };

  return <div id="viewer" style={{ height: "800px", width: "1200px" }}></div>;
};

export default ImageViewer;
