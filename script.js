(function(){
    var script = {
 "scrollBarOpacity": 0.5,
 "mobileMipmappingEnabled": false,
 "paddingBottom": 0,
 "class": "Player",
 "id": "rootPlayer",
 "defaultVRPointer": "laser",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "start": "this.init(); this.syncPlaylists([this.ThumbnailList_C9A4ECD0_C726_C9C7_41E1_C6A77AC6CEB2_playlist,this.mainPlayList])",
 "borderRadius": 0,
 "gap": 10,
 "children": [
  "this.MainViewer",
  {
   "scrollBarOpacity": 0.5,
   "paddingBottom": 0,
   "class": "Container",
   "scrollBarColor": "#000000",
   "left": "0%",
   "paddingLeft": 0,
   "gap": 10,
   "borderRadius": 0,
   "backgroundOpacity": 0,
   "children": [
    "this.Container_570E2E34_5EBE_63DE_41C2_D3D9C61EAF1F"
   ],
   "shadow": false,
   "width": "100%",
   "verticalAlign": "middle",
   "paddingRight": 0,
   "minHeight": 1,
   "propagateClick": false,
   "bottom": "0%",
   "contentOpaque": false,
   "height": 142,
   "minWidth": 1,
   "paddingTop": 0,
   "borderSize": 0,
   "scrollBarWidth": 10,
   "scrollBarMargin": 2,
   "horizontalAlign": "center",
   "data": {
    "name": "Container44746"
   },
   "layout": "horizontal",
   "scrollBarVisible": "rollOver",
   "overflow": "scroll"
  },
  "this.ThumbnailList_C9A4ECD0_C726_C9C7_41E1_C6A77AC6CEB2",
  "this.Image_C8D9FDDF_C726_CBF9_41D5_47C1EB66D456"
 ],
 "shadow": false,
 "scripts": {
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "registerKey": function(key, value){  window[key] = value; },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "getKey": function(key){  return window[key]; },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "existsKey": function(key){  return key in window; },
  "unregisterKey": function(key){  delete window[key]; },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); }
 },
 "verticalAlign": "top",
 "paddingRight": 0,
 "minHeight": 20,
 "propagateClick": false,
 "width": "100%",
 "minWidth": 20,
 "height": "100%",
 "paddingTop": 0,
 "backgroundPreloadEnabled": true,
 "contentOpaque": false,
 "downloadEnabled": false,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "definitions": [{
 "class": "PlayList",
 "items": [
  {
   "media": "this.panorama_CAE34450_C73B_D8C7_41DB_921DA97EE7D6",
   "camera": "this.panorama_CAE34450_C73B_D8C7_41DB_921DA97EE7D6_camera",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_C9A4ECD0_C726_C9C7_41E1_C6A77AC6CEB2_playlist, 0, 1)"
  },
  {
   "media": "this.panorama_C959589A_C725_C87B_41E5_C67224A029C3",
   "camera": "this.panorama_C959589A_C725_C87B_41E5_C67224A029C3_camera",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_C9A4ECD0_C726_C9C7_41E1_C6A77AC6CEB2_playlist, 1, 2)"
  },
  {
   "media": "this.panorama_CAB9AB16_C725_C84B_41A3_1B6D74697151",
   "camera": "this.panorama_CAB9AB16_C725_C84B_41A3_1B6D74697151_camera",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_C9A4ECD0_C726_C9C7_41E1_C6A77AC6CEB2_playlist, 2, 3)"
  },
  {
   "media": "this.panorama_CAB22C4D_C725_C8D9_41E5_E25DC600626A",
   "camera": "this.panorama_CAB22C4D_C725_C8D9_41E5_E25DC600626A_camera",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_C9A4ECD0_C726_C9C7_41E1_C6A77AC6CEB2_playlist, 3, 0)"
  }
 ],
 "id": "ThumbnailList_C9A4ECD0_C726_C9C7_41E1_C6A77AC6CEB2_playlist"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0,
  "hfov": 88
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "automaticRotationSpeed": 42,
 "id": "panorama_CAE34450_C73B_D8C7_41DB_921DA97EE7D6_camera"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_C959589A_C725_C87B_41E5_C67224A029C3_camera"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -149.94,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_D3EF24B8_C71B_F847_41D3_67F3D41DD0D5"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_CAB22C4D_C725_C8D9_41E5_E25DC600626A_camera"
},
{
 "class": "PlayList",
 "items": [
  {
   "media": "this.video_D6F4A022_C77D_B84B_41E2_E56DCB8D8DDC",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_D3C643EE_C71B_FFDB_41E7_F45BE053F548, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_D3C643EE_C71B_FFDB_41E7_F45BE053F548, 0)",
   "class": "VideoPlayListItem",
   "player": "this.MainViewerVideoPlayer",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer)"
  }
 ],
 "id": "playList_D3C643EE_C71B_FFDB_41E7_F45BE053F548"
},
{
 "hfovMax": 130,
 "partial": false,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CAB9AB16_C725_C84B_41A3_1B6D74697151_0/b/0/{row}_{column}.jpg",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel",
      "height": 3584,
      "rowCount": 7,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_CAB9AB16_C725_C84B_41A3_1B6D74697151_0/b/1/{row}_{column}.jpg",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_CAB9AB16_C725_C84B_41A3_1B6D74697151_0/b/2/{row}_{column}.jpg",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_CAB9AB16_C725_C84B_41A3_1B6D74697151_0/b/3/{row}_{column}.jpg",
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CAB9AB16_C725_C84B_41A3_1B6D74697151_0/f/0/{row}_{column}.jpg",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel",
      "height": 3584,
      "rowCount": 7,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_CAB9AB16_C725_C84B_41A3_1B6D74697151_0/f/1/{row}_{column}.jpg",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_CAB9AB16_C725_C84B_41A3_1B6D74697151_0/f/2/{row}_{column}.jpg",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_CAB9AB16_C725_C84B_41A3_1B6D74697151_0/f/3/{row}_{column}.jpg",
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CAB9AB16_C725_C84B_41A3_1B6D74697151_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CAB9AB16_C725_C84B_41A3_1B6D74697151_0/r/0/{row}_{column}.jpg",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel",
      "height": 3584,
      "rowCount": 7,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_CAB9AB16_C725_C84B_41A3_1B6D74697151_0/r/1/{row}_{column}.jpg",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_CAB9AB16_C725_C84B_41A3_1B6D74697151_0/r/2/{row}_{column}.jpg",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_CAB9AB16_C725_C84B_41A3_1B6D74697151_0/r/3/{row}_{column}.jpg",
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CAB9AB16_C725_C84B_41A3_1B6D74697151_0/d/0/{row}_{column}.jpg",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel",
      "height": 3584,
      "rowCount": 7,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_CAB9AB16_C725_C84B_41A3_1B6D74697151_0/d/1/{row}_{column}.jpg",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_CAB9AB16_C725_C84B_41A3_1B6D74697151_0/d/2/{row}_{column}.jpg",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_CAB9AB16_C725_C84B_41A3_1B6D74697151_0/d/3/{row}_{column}.jpg",
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CAB9AB16_C725_C84B_41A3_1B6D74697151_0/l/0/{row}_{column}.jpg",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel",
      "height": 3584,
      "rowCount": 7,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_CAB9AB16_C725_C84B_41A3_1B6D74697151_0/l/1/{row}_{column}.jpg",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_CAB9AB16_C725_C84B_41A3_1B6D74697151_0/l/2/{row}_{column}.jpg",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_CAB9AB16_C725_C84B_41A3_1B6D74697151_0/l/3/{row}_{column}.jpg",
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CAB9AB16_C725_C84B_41A3_1B6D74697151_0/u/0/{row}_{column}.jpg",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel",
      "height": 3584,
      "rowCount": 7,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_CAB9AB16_C725_C84B_41A3_1B6D74697151_0/u/1/{row}_{column}.jpg",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_CAB9AB16_C725_C84B_41A3_1B6D74697151_0/u/2/{row}_{column}.jpg",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_CAB9AB16_C725_C84B_41A3_1B6D74697151_0/u/3/{row}_{column}.jpg",
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "label": "Bedroom 1",
 "id": "panorama_CAB9AB16_C725_C84B_41A3_1B6D74697151",
 "overlays": [
  "this.overlay_D6EEA0FF_C77A_59B9_41E5_EB4C44487CF4",
  "this.overlay_D4461604_C76D_F84F_41E4_5FDD2BAC4365"
 ],
 "vfov": 180,
 "thumbnailUrl": "media/panorama_CAB9AB16_C725_C84B_41A3_1B6D74697151_t.jpg",
 "pitch": 0,
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": -36,
   "yaw": 30.06,
   "panorama": "this.panorama_C959589A_C725_C87B_41E5_C67224A029C3",
   "distance": 1
  }
 ]
},
{
 "hfovMax": 130,
 "partial": false,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CAB22C4D_C725_C8D9_41E5_E25DC600626A_0/b/0/{row}_{column}.jpg",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel",
      "height": 3584,
      "rowCount": 7,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_CAB22C4D_C725_C8D9_41E5_E25DC600626A_0/b/1/{row}_{column}.jpg",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_CAB22C4D_C725_C8D9_41E5_E25DC600626A_0/b/2/{row}_{column}.jpg",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_CAB22C4D_C725_C8D9_41E5_E25DC600626A_0/b/3/{row}_{column}.jpg",
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CAB22C4D_C725_C8D9_41E5_E25DC600626A_0/f/0/{row}_{column}.jpg",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel",
      "height": 3584,
      "rowCount": 7,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_CAB22C4D_C725_C8D9_41E5_E25DC600626A_0/f/1/{row}_{column}.jpg",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_CAB22C4D_C725_C8D9_41E5_E25DC600626A_0/f/2/{row}_{column}.jpg",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_CAB22C4D_C725_C8D9_41E5_E25DC600626A_0/f/3/{row}_{column}.jpg",
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CAB22C4D_C725_C8D9_41E5_E25DC600626A_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CAB22C4D_C725_C8D9_41E5_E25DC600626A_0/r/0/{row}_{column}.jpg",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel",
      "height": 3584,
      "rowCount": 7,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_CAB22C4D_C725_C8D9_41E5_E25DC600626A_0/r/1/{row}_{column}.jpg",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_CAB22C4D_C725_C8D9_41E5_E25DC600626A_0/r/2/{row}_{column}.jpg",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_CAB22C4D_C725_C8D9_41E5_E25DC600626A_0/r/3/{row}_{column}.jpg",
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CAB22C4D_C725_C8D9_41E5_E25DC600626A_0/d/0/{row}_{column}.jpg",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel",
      "height": 3584,
      "rowCount": 7,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_CAB22C4D_C725_C8D9_41E5_E25DC600626A_0/d/1/{row}_{column}.jpg",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_CAB22C4D_C725_C8D9_41E5_E25DC600626A_0/d/2/{row}_{column}.jpg",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_CAB22C4D_C725_C8D9_41E5_E25DC600626A_0/d/3/{row}_{column}.jpg",
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CAB22C4D_C725_C8D9_41E5_E25DC600626A_0/l/0/{row}_{column}.jpg",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel",
      "height": 3584,
      "rowCount": 7,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_CAB22C4D_C725_C8D9_41E5_E25DC600626A_0/l/1/{row}_{column}.jpg",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_CAB22C4D_C725_C8D9_41E5_E25DC600626A_0/l/2/{row}_{column}.jpg",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_CAB22C4D_C725_C8D9_41E5_E25DC600626A_0/l/3/{row}_{column}.jpg",
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CAB22C4D_C725_C8D9_41E5_E25DC600626A_0/u/0/{row}_{column}.jpg",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel",
      "height": 3584,
      "rowCount": 7,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_CAB22C4D_C725_C8D9_41E5_E25DC600626A_0/u/1/{row}_{column}.jpg",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_CAB22C4D_C725_C8D9_41E5_E25DC600626A_0/u/2/{row}_{column}.jpg",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_CAB22C4D_C725_C8D9_41E5_E25DC600626A_0/u/3/{row}_{column}.jpg",
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "label": "Bedroom 2",
 "id": "panorama_CAB22C4D_C725_C8D9_41E5_E25DC600626A",
 "overlays": [
  "this.overlay_D4CACBA8_C76A_4847_41E2_286773FF482B"
 ],
 "vfov": 180,
 "thumbnailUrl": "media/panorama_CAB22C4D_C725_C8D9_41E5_E25DC600626A_t.jpg",
 "pitch": 0,
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_CAE34450_C73B_D8C7_41DB_921DA97EE7D6"
  }
 ]
},
{
 "class": "Video",
 "label": "fearless",
 "scaleMode": "fit_inside",
 "width": 1280,
 "loop": false,
 "id": "video_D6F4A022_C77D_B84B_41E2_E56DCB8D8DDC",
 "thumbnailUrl": "media/video_D6F4A022_C77D_B84B_41E2_E56DCB8D8DDC_t.jpg",
 "height": 720,
 "video": {
  "class": "VideoResource",
  "width": 1280,
  "mp4Url": "media/video_D6F4A022_C77D_B84B_41E2_E56DCB8D8DDC.mp4",
  "height": 720
 }
},
{
 "hfovMax": 130,
 "partial": false,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C959589A_C725_C87B_41E5_C67224A029C3_0/b/0/{row}_{column}.jpg",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel",
      "height": 3584,
      "rowCount": 7,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_C959589A_C725_C87B_41E5_C67224A029C3_0/b/1/{row}_{column}.jpg",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_C959589A_C725_C87B_41E5_C67224A029C3_0/b/2/{row}_{column}.jpg",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_C959589A_C725_C87B_41E5_C67224A029C3_0/b/3/{row}_{column}.jpg",
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C959589A_C725_C87B_41E5_C67224A029C3_0/f/0/{row}_{column}.jpg",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel",
      "height": 3584,
      "rowCount": 7,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_C959589A_C725_C87B_41E5_C67224A029C3_0/f/1/{row}_{column}.jpg",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_C959589A_C725_C87B_41E5_C67224A029C3_0/f/2/{row}_{column}.jpg",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_C959589A_C725_C87B_41E5_C67224A029C3_0/f/3/{row}_{column}.jpg",
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C959589A_C725_C87B_41E5_C67224A029C3_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C959589A_C725_C87B_41E5_C67224A029C3_0/r/0/{row}_{column}.jpg",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel",
      "height": 3584,
      "rowCount": 7,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_C959589A_C725_C87B_41E5_C67224A029C3_0/r/1/{row}_{column}.jpg",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_C959589A_C725_C87B_41E5_C67224A029C3_0/r/2/{row}_{column}.jpg",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_C959589A_C725_C87B_41E5_C67224A029C3_0/r/3/{row}_{column}.jpg",
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C959589A_C725_C87B_41E5_C67224A029C3_0/d/0/{row}_{column}.jpg",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel",
      "height": 3584,
      "rowCount": 7,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_C959589A_C725_C87B_41E5_C67224A029C3_0/d/1/{row}_{column}.jpg",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_C959589A_C725_C87B_41E5_C67224A029C3_0/d/2/{row}_{column}.jpg",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_C959589A_C725_C87B_41E5_C67224A029C3_0/d/3/{row}_{column}.jpg",
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C959589A_C725_C87B_41E5_C67224A029C3_0/l/0/{row}_{column}.jpg",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel",
      "height": 3584,
      "rowCount": 7,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_C959589A_C725_C87B_41E5_C67224A029C3_0/l/1/{row}_{column}.jpg",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_C959589A_C725_C87B_41E5_C67224A029C3_0/l/2/{row}_{column}.jpg",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_C959589A_C725_C87B_41E5_C67224A029C3_0/l/3/{row}_{column}.jpg",
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C959589A_C725_C87B_41E5_C67224A029C3_0/u/0/{row}_{column}.jpg",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel",
      "height": 3584,
      "rowCount": 7,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_C959589A_C725_C87B_41E5_C67224A029C3_0/u/1/{row}_{column}.jpg",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_C959589A_C725_C87B_41E5_C67224A029C3_0/u/2/{row}_{column}.jpg",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_C959589A_C725_C87B_41E5_C67224A029C3_0/u/3/{row}_{column}.jpg",
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "label": "Bathroom",
 "id": "panorama_C959589A_C725_C87B_41E5_C67224A029C3",
 "overlays": [
  "this.overlay_D5951D20_C76F_C847_41CA_91F8CAF78DCD"
 ],
 "vfov": 180,
 "thumbnailUrl": "media/panorama_C959589A_C725_C87B_41E5_C67224A029C3_t.jpg",
 "pitch": 0,
 "hfov": 360,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "backwardYaw": 30.06,
   "yaw": -36,
   "panorama": "this.panorama_CAB9AB16_C725_C84B_41A3_1B6D74697151",
   "distance": 1
  }
 ]
},
{
 "overlays": [
  "this.overlay_D7C41A91_C71A_4849_41E5_39E8546F2CF3",
  "this.overlay_D6E6E78D_C765_D859_41E2_F4B2FD5B2BEE"
 ],
 "class": "Panorama",
 "label": "Entry",
 "id": "panorama_CAE34450_C73B_D8C7_41DB_921DA97EE7D6",
 "vfov": 180,
 "pitch": 0,
 "hfovMin": "119%",
 "partial": false,
 "hfov": 360,
 "hfovMax": 130,
 "frames": [
  {
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CAE34450_C73B_D8C7_41DB_921DA97EE7D6_0/b/0/{row}_{column}.jpg",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel",
      "height": 3584,
      "rowCount": 7,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_CAE34450_C73B_D8C7_41DB_921DA97EE7D6_0/b/1/{row}_{column}.jpg",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_CAE34450_C73B_D8C7_41DB_921DA97EE7D6_0/b/2/{row}_{column}.jpg",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_CAE34450_C73B_D8C7_41DB_921DA97EE7D6_0/b/3/{row}_{column}.jpg",
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CAE34450_C73B_D8C7_41DB_921DA97EE7D6_0/f/0/{row}_{column}.jpg",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel",
      "height": 3584,
      "rowCount": 7,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_CAE34450_C73B_D8C7_41DB_921DA97EE7D6_0/f/1/{row}_{column}.jpg",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_CAE34450_C73B_D8C7_41DB_921DA97EE7D6_0/f/2/{row}_{column}.jpg",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_CAE34450_C73B_D8C7_41DB_921DA97EE7D6_0/f/3/{row}_{column}.jpg",
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "thumbnailUrl": "media/panorama_CAE34450_C73B_D8C7_41DB_921DA97EE7D6_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CAE34450_C73B_D8C7_41DB_921DA97EE7D6_0/r/0/{row}_{column}.jpg",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel",
      "height": 3584,
      "rowCount": 7,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_CAE34450_C73B_D8C7_41DB_921DA97EE7D6_0/r/1/{row}_{column}.jpg",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_CAE34450_C73B_D8C7_41DB_921DA97EE7D6_0/r/2/{row}_{column}.jpg",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_CAE34450_C73B_D8C7_41DB_921DA97EE7D6_0/r/3/{row}_{column}.jpg",
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CAE34450_C73B_D8C7_41DB_921DA97EE7D6_0/d/0/{row}_{column}.jpg",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel",
      "height": 3584,
      "rowCount": 7,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_CAE34450_C73B_D8C7_41DB_921DA97EE7D6_0/d/1/{row}_{column}.jpg",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_CAE34450_C73B_D8C7_41DB_921DA97EE7D6_0/d/2/{row}_{column}.jpg",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_CAE34450_C73B_D8C7_41DB_921DA97EE7D6_0/d/3/{row}_{column}.jpg",
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CAE34450_C73B_D8C7_41DB_921DA97EE7D6_0/l/0/{row}_{column}.jpg",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel",
      "height": 3584,
      "rowCount": 7,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_CAE34450_C73B_D8C7_41DB_921DA97EE7D6_0/l/1/{row}_{column}.jpg",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_CAE34450_C73B_D8C7_41DB_921DA97EE7D6_0/l/2/{row}_{column}.jpg",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_CAE34450_C73B_D8C7_41DB_921DA97EE7D6_0/l/3/{row}_{column}.jpg",
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_CAE34450_C73B_D8C7_41DB_921DA97EE7D6_0/u/0/{row}_{column}.jpg",
      "width": 3584,
      "colCount": 7,
      "class": "TiledImageResourceLevel",
      "height": 3584,
      "rowCount": 7,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_CAE34450_C73B_D8C7_41DB_921DA97EE7D6_0/u/1/{row}_{column}.jpg",
      "width": 2048,
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_CAE34450_C73B_D8C7_41DB_921DA97EE7D6_0/u/2/{row}_{column}.jpg",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_CAE34450_C73B_D8C7_41DB_921DA97EE7D6_0/u/3/{row}_{column}.jpg",
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   }
  }
 ],
 "thumbnailUrl": "media/panorama_CAE34450_C73B_D8C7_41DB_921DA97EE7D6_t.jpg",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_CAB9AB16_C725_C84B_41A3_1B6D74697151"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_CAB22C4D_C725_C8D9_41E5_E25DC600626A"
  }
 ]
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 144,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "camera_D3F1147B_C71B_F8B9_41E5_8E5C59F4B10B"
},
{
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "id": "panorama_CAB9AB16_C725_C84B_41A3_1B6D74697151_camera"
},
{
 "displayPlaybackBar": true,
 "id": "MainViewerVideoPlayer",
 "buttonRestart": "this.IconButton_570E2E34_5EBE_63DE_41D3_A0CB69EBDE25",
 "class": "VideoPlayer",
 "viewerArea": "this.MainViewer",
 "buttonPause": "this.IconButton_570E2E34_5EBE_63DE_41B8_BB2B515545D1"
},
{
 "buttonPlayLeft": "this.IconButton_570E2E34_5EBE_63DE_41D1_76579067E321",
 "gyroscopeVerticalDraggingEnabled": true,
 "buttonMoveRight": "this.IconButton_570E2E34_5EBE_63DE_417E_9FF89E99273C",
 "class": "PanoramaPlayer",
 "buttonZoomIn": "this.IconButton_570E2E34_5EBE_63DE_41CF_DC0B2946505D",
 "buttonZoomOut": "this.IconButton_570E2E34_5EBE_63DE_41BF_4A1E5F2D40AB",
 "buttonPause": "this.IconButton_570E2E34_5EBE_63DE_41B8_BB2B515545D1",
 "buttonMoveUp": "this.IconButton_570E2E34_5EBE_63DE_41C7_41F80DEDE689",
 "mouseControlMode": "drag_acceleration",
 "displayPlaybackBar": true,
 "id": "MainViewerPanoramaPlayer",
 "buttonRestart": "this.IconButton_570E2E34_5EBE_63DE_41D3_A0CB69EBDE25",
 "touchControlMode": "drag_rotation",
 "buttonMoveDown": "this.IconButton_570E2E34_5EBE_63DE_41B6_6A9E5D4DE6FA",
 "viewerArea": "this.MainViewer",
 "buttonMoveLeft": "this.IconButton_570E2E34_5EBE_63DE_41D0_8EA6B8C16A08",
 "buttonPlayRight": "this.IconButton_570E2E34_5EBE_63DE_41C1_73844A18216B"
},
{
 "class": "Video",
 "label": "video",
 "scaleMode": "fit_inside",
 "width": 1280,
 "loop": false,
 "id": "video_D6996B56_C766_C8CB_41E3_B332BB8E46EB",
 "thumbnailUrl": "media/video_D6996B56_C766_C8CB_41E3_B332BB8E46EB_t.jpg",
 "height": 720,
 "video": {
  "class": "VideoResource",
  "width": 1280,
  "mp4Url": "media/video_D6996B56_C766_C8CB_41E3_B332BB8E46EB.mp4",
  "height": 720
 }
},
{
 "class": "PlayList",
 "items": [
  {
   "media": "this.panorama_CAE34450_C73B_D8C7_41DB_921DA97EE7D6",
   "camera": "this.panorama_CAE34450_C73B_D8C7_41DB_921DA97EE7D6_camera",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)"
  },
  {
   "media": "this.panorama_C959589A_C725_C87B_41E5_C67224A029C3",
   "camera": "this.panorama_C959589A_C725_C87B_41E5_C67224A029C3_camera",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)"
  },
  {
   "media": "this.panorama_CAB9AB16_C725_C84B_41A3_1B6D74697151",
   "camera": "this.panorama_CAB9AB16_C725_C84B_41A3_1B6D74697151_camera",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)"
  },
  {
   "media": "this.panorama_CAB22C4D_C725_C8D9_41E5_E25DC600626A",
   "end": "this.trigger('tourEnded')",
   "camera": "this.panorama_CAB22C4D_C725_C8D9_41E5_E25DC600626A_camera",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 0)"
  }
 ],
 "id": "mainPlayList"
},
{
 "class": "PlayList",
 "items": [
  {
   "media": "this.video_D6996B56_C766_C8CB_41E3_B332BB8E46EB",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_D3C663ED_C71B_FFD9_41CD_286F8F9E50BB, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_D3C663ED_C71B_FFD9_41CD_286F8F9E50BB, 0)",
   "class": "VideoPlayListItem",
   "player": "this.MainViewerVideoPlayer",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer)"
  }
 ],
 "id": "playList_D3C663ED_C71B_FFD9_41CD_286F8F9E50BB"
},
{
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "id": "MainViewer",
 "left": 0,
 "paddingLeft": 0,
 "toolTipShadowVerticalLength": 0,
 "progressBackgroundColorDirection": "vertical",
 "borderRadius": 0,
 "toolTipPaddingBottom": 4,
 "progressBackgroundColorRatios": [
  0,
  1
 ],
 "toolTipTextShadowBlurRadius": 3,
 "width": "100%",
 "playbackBarBottom": 10,
 "playbackBarBorderRadius": 4,
 "toolTipPaddingRight": 6,
 "toolTipBorderSize": 1,
 "paddingRight": 0,
 "progressRight": 10,
 "toolTipFontFamily": "Arial",
 "progressBackgroundColor": [
  "#EEEEEE",
  "#CCCCCC"
 ],
 "propagateClick": false,
 "toolTipFontStyle": "normal",
 "progressOpacity": 1,
 "playbackBarHeadBorderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarLeft": 0,
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "toolTipShadowBlurRadius": 3,
 "height": "100%",
 "transitionDuration": 500,
 "paddingTop": 0,
 "vrPointerSelectionColor": "#FF6600",
 "progressBorderColor": "#AAAAAA",
 "toolTipPaddingTop": 4,
 "playbackBarProgressBorderColor": "#000000",
 "toolTipTextShadowColor": "#000000",
 "playbackBarHeadHeight": 30,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "vrPointerSelectionTime": 2000,
 "firstTransitionDuration": 0,
 "playbackBarHeadShadow": true,
 "progressBackgroundOpacity": 1,
 "playbackBarOpacity": 1,
 "progressBottom": 1,
 "progressHeight": 20,
 "paddingBottom": 0,
 "toolTipBackgroundColor": "#F6F6F6",
 "class": "ViewerArea",
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipShadowOpacity": 1,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "toolTipShadowSpread": 0,
 "progressBarOpacity": 1,
 "vrPointerColor": "#FFFFFF",
 "playbackBarProgressBackgroundColor": [
  "#222222",
  "#444444"
 ],
 "toolTipOpacity": 1,
 "progressBorderSize": 2,
 "shadow": false,
 "progressLeft": 10,
 "toolTipFontColor": "#606060",
 "minHeight": 50,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "top": 0,
 "playbackBarProgressOpacity": 1,
 "playbackBarBorderSize": 2,
 "toolTipPaddingLeft": 6,
 "playbackBarBackgroundColor": [
  "#EEEEEE",
  "#CCCCCC"
 ],
 "progressBorderRadius": 4,
 "toolTipFontSize": 12,
 "playbackBarHeight": 20,
 "toolTipTextShadowOpacity": 0,
 "progressBarBorderColor": "#000000",
 "playbackBarBackgroundOpacity": 1,
 "toolTipDisplayTime": 600,
 "playbackBarBackgroundColorDirection": "vertical",
 "minWidth": 100,
 "transitionMode": "blending",
 "playbackBarProgressBorderSize": 0,
 "playbackBarHeadWidth": 6,
 "playbackBarProgressBackgroundColorRatios": [
  0,
  1
 ],
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadShadowColor": "#000000",
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarRight": 0,
 "toolTipBorderColor": "#767676",
 "borderSize": 0,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipBorderRadius": 3,
 "playbackBarHeadOpacity": 1,
 "progressBarBackgroundColorRatios": [
  0,
  1
 ],
 "toolTipShadowColor": "#333333",
 "data": {
  "name": "Main Viewer"
 },
 "progressBarBorderRadius": 4,
 "progressBarBackgroundColor": [
  "#222222",
  "#444444"
 ],
 "progressBarBorderSize": 0,
 "playbackBarBorderColor": "#AAAAAA",
 "playbackBarProgressBorderRadius": 0,
 "toolTipFontWeight": "normal",
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadShadowBlurRadius": 3
},
{
 "scrollBarOpacity": 0.5,
 "paddingBottom": 0,
 "class": "Container",
 "id": "Container_570E2E34_5EBE_63DE_41C2_D3D9C61EAF1F",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "width": 360,
 "gap": 4,
 "backgroundOpacity": 0,
 "children": [
  "this.IconButton_570E2E34_5EBE_63DE_41BF_4A1E5F2D40AB",
  "this.IconButton_570E2E34_5EBE_63DE_41D3_A0CB69EBDE25",
  "this.IconButton_570E2E34_5EBE_63DE_41D1_76579067E321",
  "this.IconButton_570E2E34_5EBE_63DE_41D0_8EA6B8C16A08",
  "this.Container_570E2E34_5EBE_63DE_41C3_223EC62DD869",
  "this.IconButton_570E2E34_5EBE_63DE_417E_9FF89E99273C",
  "this.IconButton_570E2E34_5EBE_63DE_41C1_73844A18216B",
  "this.IconButton_570E2E34_5EBE_63DE_41B3_E36925A8158B",
  "this.IconButton_570E2E34_5EBE_63DE_41CF_DC0B2946505D"
 ],
 "shadow": false,
 "borderRadius": 0,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "minHeight": 20,
 "propagateClick": false,
 "contentOpaque": false,
 "height": "95.07%",
 "minWidth": 360,
 "paddingTop": 0,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "horizontalAlign": "center",
 "data": {
  "name": "Container37498"
 },
 "layout": "horizontal",
 "scrollBarVisible": "rollOver",
 "overflow": "hidden"
},
{
 "id": "ThumbnailList_C9A4ECD0_C726_C9C7_41E1_C6A77AC6CEB2",
 "paddingLeft": 20,
 "scrollBarColor": "#FFFFFF",
 "playList": "this.ThumbnailList_C9A4ECD0_C726_C9C7_41E1_C6A77AC6CEB2_playlist",
 "right": "3.24%",
 "borderRadius": 5,
 "itemPaddingLeft": 3,
 "itemVerticalAlign": "middle",
 "itemThumbnailScaleMode": "fit_outside",
 "paddingRight": 20,
 "itemThumbnailShadowSpread": 1,
 "propagateClick": false,
 "height": "58.772%",
 "itemPaddingTop": 3,
 "itemBackgroundColorRatios": [],
 "itemBackgroundColor": [],
 "paddingTop": 10,
 "itemLabelFontColor": "#FFFFFF",
 "itemThumbnailOpacity": 1,
 "scrollBarWidth": 10,
 "itemPaddingRight": 3,
 "selectedItemLabelFontColor": "#FFCC00",
 "rollOverItemLabelFontWeight": "normal",
 "itemThumbnailShadowColor": "#000000",
 "horizontalAlign": "left",
 "itemBackgroundColorDirection": "vertical",
 "itemThumbnailShadow": true,
 "layout": "vertical",
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "itemThumbnailShadowHorizontalLength": 3,
 "itemOpacity": 1,
 "itemThumbnailShadowOpacity": 0.54,
 "itemLabelGap": 9,
 "paddingBottom": 10,
 "itemThumbnailHeight": 75,
 "class": "ThumbnailList",
 "itemMode": "normal",
 "gap": 10,
 "itemThumbnailBorderRadius": 50,
 "itemLabelFontWeight": "normal",
 "verticalAlign": "top",
 "itemHorizontalAlign": "center",
 "backgroundOpacity": 0,
 "itemThumbnailShadowBlurRadius": 8,
 "shadow": false,
 "minHeight": 20,
 "top": "17.55%",
 "itemLabelTextDecoration": "none",
 "selectedItemLabelFontWeight": "bold",
 "itemPaddingBottom": 3,
 "minWidth": 20,
 "itemThumbnailShadowVerticalLength": 3,
 "itemLabelFontFamily": "Arial",
 "itemLabelFontSize": 14,
 "itemBackgroundOpacity": 0,
 "borderSize": 0,
 "scrollBarMargin": 2,
 "itemThumbnailWidth": 75,
 "rollOverItemBackgroundOpacity": 0,
 "itemLabelPosition": "bottom",
 "itemBorderRadius": 0,
 "itemLabelFontStyle": "normal",
 "data": {
  "name": "ThumbnailList35762"
 },
 "itemLabelHorizontalAlign": "center"
},
{
 "paddingBottom": 0,
 "class": "Image",
 "maxWidth": 1031,
 "id": "Image_C8D9FDDF_C726_CBF9_41D5_47C1EB66D456",
 "left": "2.26%",
 "paddingLeft": 0,
 "maxHeight": 850,
 "backgroundOpacity": 0,
 "verticalAlign": "middle",
 "shadow": false,
 "borderRadius": 0,
 "paddingRight": 0,
 "minHeight": 1,
 "top": "3.72%",
 "propagateClick": false,
 "width": "13.723%",
 "height": "19.744%",
 "url": "skin/Image_C8D9FDDF_C726_CBF9_41D5_47C1EB66D456.png",
 "minWidth": 1,
 "paddingTop": 0,
 "borderSize": 0,
 "horizontalAlign": "center",
 "scaleMode": "fit_inside",
 "data": {
  "name": "Image9316"
 }
},
{
 "iconURL": "skin/IconButton_570E2E34_5EBE_63DE_41B3_E36925A8158B.png",
 "paddingBottom": 0,
 "class": "IconButton",
 "id": "IconButton_570E2E34_5EBE_63DE_41B3_E36925A8158B",
 "paddingLeft": 0,
 "width": 40,
 "backgroundOpacity": 0,
 "verticalAlign": "middle",
 "shadow": false,
 "borderRadius": 0,
 "paddingRight": 0,
 "minHeight": 0,
 "propagateClick": false,
 "mode": "toggle",
 "height": 40,
 "minWidth": 0,
 "paddingTop": 0,
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_570E2E34_5EBE_63DE_41B3_E36925A8158B_pressed.png",
 "horizontalAlign": "center",
 "data": {
  "name": "Button37509"
 },
 "transparencyActive": false,
 "cursor": "hand"
},
{
 "videoVisibleOnStop": false,
 "id": "overlay_D6EEA0FF_C77A_59B9_41E5_EB4C44487CF4",
 "class": "VideoPanoramaOverlay",
 "roll": 0.01,
 "loop": false,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "class": "ImageResourceLevel",
    "url": "media/overlay_D6EEA0FF_C77A_59B9_41E5_EB4C44487CF4_t.jpg",
    "width": 1280,
    "height": 720
   }
  ]
 },
 "pitch": -0.05,
 "useHandCursor": true,
 "mouseEnter": "this.overlay_D6EEA0FF_C77A_59B9_41E5_EB4C44487CF4.play()",
 "click": "this.overlay_D6EEA0FF_C77A_59B9_41E5_EB4C44487CF4.pause()",
 "yaw": 105.97,
 "hfov": 41.69,
 "autoplay": false,
 "rotationX": 0.07,
 "enabledInCardboard": true,
 "rotationY": 16.47,
 "vfov": 24.75,
 "distance": 50,
 "blending": 0,
 "data": {
  "label": "Video"
 },
 "video": {
  "class": "VideoResource",
  "width": 1280,
  "mp4Url": "media/video_D6F4A022_C77D_B84B_41E2_E56DCB8D8DDC.mp4",
  "height": 720
 }
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C959589A_C725_C87B_41E5_C67224A029C3, this.camera_D3F1147B_C71B_F8B9_41E5_8E5C59F4B10B); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_D3C7C3EB_C71B_FFD9_41E5_0BA471CC0C54",
   "pitch": -14.4,
   "yaw": 30.06,
   "hfov": 10.91,
   "distance": 50
  }
 ],
 "id": "overlay_D4461604_C76D_F84F_41E4_5FDD2BAC4365",
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Arrow 01a Right-Up"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 30.06,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_CAB9AB16_C725_C84B_41A3_1B6D74697151_0_HS_0_0_0_map.gif",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -14.4,
   "hfov": 10.91
  }
 ]
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 0)"
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_D3C633EC_C71B_FFDF_41E4_282353376DC4",
   "pitch": -12.12,
   "yaw": -11.81,
   "hfov": 16.15,
   "distance": 100
  }
 ],
 "id": "overlay_D4CACBA8_C76A_4847_41E2_286773FF482B",
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Arrow 01b"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -11.81,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_CAB22C4D_C725_C8D9_41E5_E25DC600626A_0_HS_0_0_0_map.gif",
      "width": 37,
      "height": 16
     }
    ]
   },
   "pitch": -12.12,
   "hfov": 16.15
  }
 ]
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_CAB9AB16_C725_C84B_41A3_1B6D74697151, this.camera_D3EF24B8_C71B_F847_41D3_67F3D41DD0D5); this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_D3C733EA_C71B_FFDB_41E5_76338BD21AF1",
   "pitch": -33.57,
   "yaw": -36,
   "hfov": 11.49,
   "distance": 100
  }
 ],
 "id": "overlay_D5951D20_C76F_C847_41CA_91F8CAF78DCD",
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Arrow 01b"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -36,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_C959589A_C725_C87B_41E5_C67224A029C3_0_HS_0_0_0_map.gif",
      "width": 37,
      "height": 16
     }
    ]
   },
   "pitch": -33.57,
   "hfov": 11.49
  }
 ]
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_D3C013E7_C71B_FFC9_41BF_BF992CAE3DFB",
   "pitch": -15.91,
   "yaw": 122.48,
   "hfov": 9.6,
   "distance": 50
  }
 ],
 "id": "overlay_D7C41A91_C71A_4849_41E5_39E8546F2CF3",
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Arrow 01 Left-Up"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 122.48,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_CAE34450_C73B_D8C7_41DB_921DA97EE7D6_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -15.91,
   "hfov": 9.6
  }
 ]
},
{
 "useHandCursor": true,
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "enabledInCardboard": true,
 "class": "HotspotPanoramaOverlay",
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_D3C0D3E9_C71B_FFD9_41C2_9EA28529B680",
   "pitch": -15.61,
   "yaw": 131.29,
   "hfov": 16.09,
   "distance": 50
  }
 ],
 "id": "overlay_D6E6E78D_C765_D859_41E2_F4B2FD5B2BEE",
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Arrow 01a Right-Up"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 131.29,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_CAE34450_C73B_D8C7_41DB_921DA97EE7D6_0_HS_1_0_0_map.gif",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -15.61,
   "hfov": 16.09
  }
 ]
},
{
 "iconURL": "skin/IconButton_570E2E34_5EBE_63DE_41D3_A0CB69EBDE25.png",
 "paddingBottom": 0,
 "class": "IconButton",
 "id": "IconButton_570E2E34_5EBE_63DE_41D3_A0CB69EBDE25",
 "paddingLeft": 0,
 "width": 40,
 "backgroundOpacity": 0,
 "verticalAlign": "middle",
 "shadow": false,
 "borderRadius": 0,
 "paddingRight": 0,
 "minHeight": 0,
 "propagateClick": false,
 "mode": "push",
 "height": 40,
 "minWidth": 0,
 "paddingTop": 0,
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_570E2E34_5EBE_63DE_41D3_A0CB69EBDE25_pressed.png",
 "horizontalAlign": "center",
 "data": {
  "name": "Button37500"
 },
 "transparencyActive": false,
 "cursor": "hand",
 "rollOverIconURL": "skin/IconButton_570E2E34_5EBE_63DE_41D3_A0CB69EBDE25_rollover.png"
},
{
 "iconURL": "skin/IconButton_570E2E34_5EBE_63DE_41B8_BB2B515545D1.png",
 "paddingBottom": 0,
 "class": "IconButton",
 "id": "IconButton_570E2E34_5EBE_63DE_41B8_BB2B515545D1",
 "paddingLeft": 0,
 "width": 40,
 "backgroundOpacity": 0,
 "verticalAlign": "middle",
 "shadow": false,
 "borderRadius": 0,
 "paddingRight": 0,
 "minHeight": 0,
 "propagateClick": false,
 "mode": "toggle",
 "height": 40,
 "minWidth": 0,
 "paddingTop": 0,
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_570E2E34_5EBE_63DE_41B8_BB2B515545D1_pressed.png",
 "horizontalAlign": "center",
 "data": {
  "name": "Button37505"
 },
 "transparencyActive": false,
 "cursor": "hand"
},
{
 "iconURL": "skin/IconButton_570E2E34_5EBE_63DE_41D1_76579067E321.png",
 "paddingBottom": 0,
 "class": "IconButton",
 "id": "IconButton_570E2E34_5EBE_63DE_41D1_76579067E321",
 "paddingLeft": 0,
 "width": 40,
 "backgroundOpacity": 0,
 "verticalAlign": "middle",
 "shadow": false,
 "borderRadius": 0,
 "paddingRight": 0,
 "minHeight": 0,
 "propagateClick": false,
 "mode": "push",
 "height": 40,
 "minWidth": 0,
 "paddingTop": 0,
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_570E2E34_5EBE_63DE_41D1_76579067E321_pressed.png",
 "horizontalAlign": "center",
 "data": {
  "name": "Button37501"
 },
 "transparencyActive": false,
 "cursor": "hand",
 "rollOverIconURL": "skin/IconButton_570E2E34_5EBE_63DE_41D1_76579067E321_rollover.png"
},
{
 "iconURL": "skin/IconButton_570E2E34_5EBE_63DE_417E_9FF89E99273C.png",
 "paddingBottom": 0,
 "class": "IconButton",
 "id": "IconButton_570E2E34_5EBE_63DE_417E_9FF89E99273C",
 "paddingLeft": 0,
 "width": 32,
 "backgroundOpacity": 0,
 "verticalAlign": "middle",
 "shadow": false,
 "borderRadius": 0,
 "paddingRight": 0,
 "minHeight": 0,
 "propagateClick": false,
 "mode": "push",
 "height": 32,
 "minWidth": 0,
 "paddingTop": 0,
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_570E2E34_5EBE_63DE_417E_9FF89E99273C_pressed.png",
 "horizontalAlign": "center",
 "data": {
  "name": "Button37507"
 },
 "transparencyActive": false,
 "cursor": "hand",
 "rollOverIconURL": "skin/IconButton_570E2E34_5EBE_63DE_417E_9FF89E99273C_rollover.png"
},
{
 "iconURL": "skin/IconButton_570E2E34_5EBE_63DE_41CF_DC0B2946505D.png",
 "paddingBottom": 0,
 "class": "IconButton",
 "id": "IconButton_570E2E34_5EBE_63DE_41CF_DC0B2946505D",
 "paddingLeft": 0,
 "width": 32,
 "backgroundOpacity": 0,
 "verticalAlign": "middle",
 "shadow": false,
 "borderRadius": 0,
 "paddingRight": 0,
 "minHeight": 0,
 "propagateClick": false,
 "mode": "push",
 "height": 32,
 "minWidth": 0,
 "paddingTop": 0,
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_570E2E34_5EBE_63DE_41CF_DC0B2946505D_pressed.png",
 "horizontalAlign": "center",
 "data": {
  "name": "Button37510"
 },
 "transparencyActive": false,
 "cursor": "hand",
 "rollOverIconURL": "skin/IconButton_570E2E34_5EBE_63DE_41CF_DC0B2946505D_rollover.png"
},
{
 "iconURL": "skin/IconButton_570E2E34_5EBE_63DE_41BF_4A1E5F2D40AB.png",
 "paddingBottom": 0,
 "class": "IconButton",
 "id": "IconButton_570E2E34_5EBE_63DE_41BF_4A1E5F2D40AB",
 "paddingLeft": 0,
 "width": 32,
 "backgroundOpacity": 0,
 "verticalAlign": "middle",
 "shadow": false,
 "borderRadius": 0,
 "paddingRight": 0,
 "minHeight": 0,
 "propagateClick": false,
 "mode": "push",
 "height": 32,
 "minWidth": 0,
 "paddingTop": 0,
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_570E2E34_5EBE_63DE_41BF_4A1E5F2D40AB_pressed.png",
 "horizontalAlign": "center",
 "data": {
  "name": "Button37499"
 },
 "transparencyActive": false,
 "cursor": "hand",
 "rollOverIconURL": "skin/IconButton_570E2E34_5EBE_63DE_41BF_4A1E5F2D40AB_rollover.png"
},
{
 "iconURL": "skin/IconButton_570E2E34_5EBE_63DE_41C7_41F80DEDE689.png",
 "paddingBottom": 0,
 "class": "IconButton",
 "id": "IconButton_570E2E34_5EBE_63DE_41C7_41F80DEDE689",
 "paddingLeft": 0,
 "width": 32,
 "backgroundOpacity": 0,
 "verticalAlign": "middle",
 "shadow": false,
 "borderRadius": 0,
 "paddingRight": 0,
 "minHeight": 0,
 "propagateClick": false,
 "mode": "push",
 "height": 32,
 "minWidth": 0,
 "paddingTop": 0,
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_570E2E34_5EBE_63DE_41C7_41F80DEDE689_pressed.png",
 "horizontalAlign": "center",
 "data": {
  "name": "Button37504"
 },
 "transparencyActive": false,
 "cursor": "hand",
 "rollOverIconURL": "skin/IconButton_570E2E34_5EBE_63DE_41C7_41F80DEDE689_rollover.png"
},
{
 "iconURL": "skin/IconButton_570E2E34_5EBE_63DE_41B6_6A9E5D4DE6FA.png",
 "paddingBottom": 0,
 "class": "IconButton",
 "id": "IconButton_570E2E34_5EBE_63DE_41B6_6A9E5D4DE6FA",
 "paddingLeft": 0,
 "width": 32,
 "backgroundOpacity": 0,
 "verticalAlign": "middle",
 "shadow": false,
 "borderRadius": 0,
 "paddingRight": 0,
 "minHeight": 0,
 "propagateClick": false,
 "mode": "push",
 "height": 32,
 "minWidth": 0,
 "paddingTop": 0,
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_570E2E34_5EBE_63DE_41B6_6A9E5D4DE6FA_pressed.png",
 "horizontalAlign": "center",
 "data": {
  "name": "Button37506"
 },
 "transparencyActive": false,
 "cursor": "hand",
 "rollOverIconURL": "skin/IconButton_570E2E34_5EBE_63DE_41B6_6A9E5D4DE6FA_rollover.png"
},
{
 "iconURL": "skin/IconButton_570E2E34_5EBE_63DE_41D0_8EA6B8C16A08.png",
 "paddingBottom": 0,
 "class": "IconButton",
 "id": "IconButton_570E2E34_5EBE_63DE_41D0_8EA6B8C16A08",
 "paddingLeft": 0,
 "width": 32,
 "backgroundOpacity": 0,
 "verticalAlign": "middle",
 "shadow": false,
 "borderRadius": 0,
 "paddingRight": 0,
 "minHeight": 0,
 "propagateClick": false,
 "mode": "push",
 "height": 32,
 "minWidth": 0,
 "paddingTop": 0,
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_570E2E34_5EBE_63DE_41D0_8EA6B8C16A08_pressed.png",
 "horizontalAlign": "center",
 "data": {
  "name": "Button37502"
 },
 "transparencyActive": false,
 "cursor": "hand",
 "rollOverIconURL": "skin/IconButton_570E2E34_5EBE_63DE_41D0_8EA6B8C16A08_rollover.png"
},
{
 "iconURL": "skin/IconButton_570E2E34_5EBE_63DE_41C1_73844A18216B.png",
 "paddingBottom": 0,
 "class": "IconButton",
 "id": "IconButton_570E2E34_5EBE_63DE_41C1_73844A18216B",
 "paddingLeft": 0,
 "width": 40,
 "backgroundOpacity": 0,
 "verticalAlign": "middle",
 "shadow": false,
 "borderRadius": 0,
 "paddingRight": 0,
 "minHeight": 0,
 "propagateClick": false,
 "mode": "push",
 "height": 40,
 "minWidth": 0,
 "paddingTop": 0,
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_570E2E34_5EBE_63DE_41C1_73844A18216B_pressed.png",
 "horizontalAlign": "center",
 "data": {
  "name": "Button37508"
 },
 "transparencyActive": false,
 "cursor": "hand",
 "rollOverIconURL": "skin/IconButton_570E2E34_5EBE_63DE_41C1_73844A18216B_rollover.png"
},
{
 "scrollBarOpacity": 0.5,
 "paddingBottom": 0,
 "class": "Container",
 "id": "Container_570E2E34_5EBE_63DE_41C3_223EC62DD869",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "width": 40,
 "gap": 4,
 "backgroundOpacity": 0,
 "children": [
  "this.IconButton_570E2E34_5EBE_63DE_41C7_41F80DEDE689",
  "this.IconButton_570E2E34_5EBE_63DE_41B8_BB2B515545D1",
  "this.IconButton_570E2E34_5EBE_63DE_41B6_6A9E5D4DE6FA"
 ],
 "shadow": false,
 "borderRadius": 0,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "minHeight": 20,
 "propagateClick": false,
 "contentOpaque": false,
 "height": "100%",
 "minWidth": 20,
 "paddingTop": 0,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "horizontalAlign": "center",
 "data": {
  "name": "Container37503"
 },
 "layout": "vertical",
 "scrollBarVisible": "rollOver",
 "overflow": "hidden"
},
{
 "frameDuration": 41,
 "colCount": 4,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_CAB9AB16_C725_C84B_41A3_1B6D74697151_0_HS_0_0.png",
   "width": 1220,
   "height": 1110
  }
 ],
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_D3C7C3EB_C71B_FFD9_41E5_0BA471CC0C54",
 "rowCount": 6,
 "frameCount": 24
},
{
 "frameDuration": 41,
 "colCount": 4,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_CAB22C4D_C725_C8D9_41E5_E25DC600626A_0_HS_0_0.png",
   "width": 1220,
   "height": 780
  }
 ],
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_D3C633EC_C71B_FFDF_41E4_282353376DC4",
 "rowCount": 6,
 "frameCount": 24
},
{
 "frameDuration": 41,
 "colCount": 4,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_C959589A_C725_C87B_41E5_C67224A029C3_0_HS_0_0.png",
   "width": 1220,
   "height": 780
  }
 ],
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_D3C733EA_C71B_FFDB_41E5_76338BD21AF1",
 "rowCount": 6,
 "frameCount": 24
},
{
 "frameDuration": 41,
 "colCount": 4,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_CAE34450_C73B_D8C7_41DB_921DA97EE7D6_0_HS_0_0.png",
   "width": 800,
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_D3C013E7_C71B_FFC9_41BF_BF992CAE3DFB",
 "rowCount": 6,
 "frameCount": 24
},
{
 "frameDuration": 41,
 "colCount": 4,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_CAE34450_C73B_D8C7_41DB_921DA97EE7D6_0_HS_1_0.png",
   "width": 1220,
   "height": 1110
  }
 ],
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_D3C0D3E9_C71B_FFD9_41C2_9EA28529B680",
 "rowCount": 6,
 "frameCount": 24
}],
 "mouseWheelEnabled": true,
 "horizontalAlign": "left",
 "buttonToggleMute": "this.IconButton_570E2E34_5EBE_63DE_41B3_E36925A8158B",
 "data": {
  "name": "Player43899"
 },
 "vrPolyfillScale": 0.5,
 "layout": "absolute",
 "scrollBarVisible": "rollOver",
 "desktopMipmappingEnabled": false,
 "overflow": "visible"
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
