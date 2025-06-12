import {WidgetFor, WidgetType} from '../dashboard/button/dashboard-button-custom-web/dashboard-button-custom-web.component';

export class NotadoWidgetUtil {

  public static createWidgetFor(businessId: number,
                                colorBackground: string,
                                colorLabel: string,
                                label: string,
                                radius: string,
                                formSize: string,
                                buttonPosition: string,
                                url: string,
                                widgetType: WidgetType,
                                widgetFor: WidgetFor,
                                forEntityId: number): string {
    const reservationButton: string = `<button id="${NotadoWidgetUtil.buttonShow(businessId, widgetFor, forEntityId)}" class="${NotadoWidgetUtil.buttonShow(businessId, widgetFor, forEntityId)}">${label}</button>`;

    let script: string = `
              <script type="text/javascript">
                var notadoWidget = {
                                getMaxZIndex: function () {
                                  var zIndex, z = 0,
                                    all = document.getElementsByTagName("*");
                                  for (var i = 0, n = all.length; i < n; i++) {
                                    zIndex = document.defaultView.getComputedStyle(all[i], null).getPropertyValue("z-index");
                                    zIndex = parseInt(zIndex, 10);
                                    z = (zIndex) ? Math.max(z, zIndex) : z;
                                  }
                                  return z;
                                },
                                createIframe: function () {
                                  var iFrame = document.createElement("iframe");
                                  iFrame.id = "${NotadoWidgetUtil.iFrame(businessId, widgetFor, forEntityId)}";
                                  iFrame.className = "${NotadoWidgetUtil.iFrame(businessId, widgetFor, forEntityId)}";
                                  iFrame.setAttribute("frameborder", 0);
                                  iFrame.setAttribute("allowtransparency", "true");
                                  iFrame.src = "${NotadoWidgetUtil.urlFor(url, widgetFor, forEntityId)}";
                                  document.getElementsByTagName("body")[0].appendChild(iFrame);
                                  return iFrame;
                                },
                                createCloseButton: function () {
                                  var button = document.createElement("button");
                                  button.id = "${NotadoWidgetUtil.buttonHide(businessId, widgetFor, forEntityId)}";
                                  button.className = "${NotadoWidgetUtil.buttonHide(businessId, widgetFor, forEntityId)}";
                                  document.getElementsByTagName("body")[0].appendChild(button);
                                  return button;
                                },
                                createReservationButton: function () {
                                  var button = document.createElement("button");
                                  button.id = "${NotadoWidgetUtil.buttonShow(businessId, widgetFor, forEntityId)}";
                                  button.className = "${NotadoWidgetUtil.buttonShow(businessId, widgetFor, forEntityId)}";
                                  button.innerHTML = "${label}";
                                  document.getElementsByTagName("body")[0].appendChild(button);
                                  return button;
                                },
                                initButtonActions: function () {
                                     var windowWidth = window.innerWidth;
                                     if (windowWidth < 600) {
                                       ${NotadoWidgetUtil.iFrame(businessId, widgetFor, forEntityId)}.style.display = 'none';
                                       ${NotadoWidgetUtil.buttonShow(businessId, widgetFor, forEntityId)}.addEventListener("click", function() {
                                            window.open("${NotadoWidgetUtil.urlFor(url, widgetFor, forEntityId)}", '_blank');
                                         });
                                         return;
                                     }
                                       ${NotadoWidgetUtil.buttonHide(businessId, widgetFor, forEntityId)}.style.display = 'none';
                                       ${NotadoWidgetUtil.iFrame(businessId, widgetFor, forEntityId)}.style.display = 'none';
                                       ${NotadoWidgetUtil.buttonHide(businessId, widgetFor, forEntityId)}.addEventListener("click", function() {
                                                   ${NotadoWidgetUtil.buttonHide(businessId, widgetFor, forEntityId)}.style.display = 'none';
                                                   ${NotadoWidgetUtil.iFrame(businessId, widgetFor, forEntityId)}.style.display = 'none';
                                                           });
                                       ${NotadoWidgetUtil.buttonShow(businessId, widgetFor, forEntityId)}.addEventListener("click", function() {
                                                   ${NotadoWidgetUtil.buttonHide(businessId, widgetFor, forEntityId)}.style.display = 'block';
                                                   ${NotadoWidgetUtil.iFrame(businessId, widgetFor, forEntityId)}.style.display = 'block';
                                                           });
                                     window.addEventListener("message", function (e) {
                                             if (e && e.data == "closeNotadoIframe") {
                                                     ${NotadoWidgetUtil.iFrame(businessId, widgetFor, forEntityId)}.style.display = 'none';
                                                     ${NotadoWidgetUtil.buttonHide(businessId, widgetFor, forEntityId)}.style.display = 'none';
                                     }});
                                },
                               initWidget: function () {
                                  notadoWidget.createCloseButton();
                                  notadoWidget.createIframe();
                                  ${NotadoWidgetUtil.notadoButtonShow(buttonPosition)};
                                  notadoWidget.initButtonActions();
                                  setTimeout(() => {
                                    var ${NotadoWidgetUtil.buttonShow(businessId, widgetFor, forEntityId)} = document.getElementById("${NotadoWidgetUtil.buttonShow(businessId, widgetFor, forEntityId)}");
                                    ${NotadoWidgetUtil.buttonShow(businessId, widgetFor, forEntityId)}.style.zIndex = notadoWidget.getMaxZIndex("body") + 1;
                                    var ${NotadoWidgetUtil.iFrame(businessId, widgetFor, forEntityId)} = document.getElementById("${NotadoWidgetUtil.iFrame(businessId, widgetFor, forEntityId)}");
                                    ${NotadoWidgetUtil.iFrame(businessId, widgetFor, forEntityId)}.style.zIndex = notadoWidget.getMaxZIndex("body") + 2;
                                    var ${NotadoWidgetUtil.buttonHide(businessId, widgetFor, forEntityId)} = document.getElementById("${NotadoWidgetUtil.buttonHide(businessId, widgetFor, forEntityId)}");
                                    ${NotadoWidgetUtil.buttonHide(businessId, widgetFor, forEntityId)}.style.zIndex = notadoWidget.getMaxZIndex("body") + 3;
                                  }, 500);
                                }
                              };
                              document.addEventListener("DOMContentLoaded", notadoWidget.initWidget(), false);
              </script>`;

    let style: string = `
              <style>
                .${NotadoWidgetUtil.buttonShow(businessId, widgetFor, forEntityId)} {
                                background: ${colorBackground};
                                color: ${colorLabel};
                                padding: 15px 25px;
                                font-size: 1.1em;
                                border-radius: ${radius};
                                ${NotadoWidgetUtil.computePosition(buttonPosition)}
                                border: 1px solid;
                                cursor: pointer;
                }

                .${NotadoWidgetUtil.iFrame(businessId, widgetFor, forEntityId)} {
                      ${NotadoWidgetUtil.getIFrameStyle(widgetType)}
                }

                .${NotadoWidgetUtil.buttonHide(businessId, widgetFor, forEntityId)} {
                      ${NotadoWidgetUtil.getHideButtonStyle(widgetType)}
                }

                @media (max-width: 576px) {
                  .${NotadoWidgetUtil.iFrame(businessId, widgetFor, forEntityId)} { width: 100%; }
                  .${NotadoWidgetUtil.buttonHide(businessId, widgetFor, forEntityId)} { right: 10vw; }
                }
                @media (min-width: 576px) {
                  .${NotadoWidgetUtil.iFrame(businessId, widgetFor, forEntityId)} { width: ${NotadoWidgetUtil.computeFormSize(650, formSize, widgetType)}; }
                  .${NotadoWidgetUtil.buttonHide(businessId, widgetFor, forEntityId)} { right: ${NotadoWidgetUtil.computeCloseButtonPosition(650, formSize, widgetType)}; }
                }
                @media (min-width: 650px) {
                  .${NotadoWidgetUtil.iFrame(businessId, widgetFor, forEntityId)} { width: ${NotadoWidgetUtil.computeFormSize(650, formSize, widgetType)}; }
                  .${NotadoWidgetUtil.buttonHide(businessId, widgetFor, forEntityId)} { right: ${NotadoWidgetUtil.computeCloseButtonPosition(650, formSize, widgetType)}; }
                }
                @media (min-width: 800px) {
                  .${NotadoWidgetUtil.iFrame(businessId, widgetFor, forEntityId)} { width: ${NotadoWidgetUtil.computeFormSize(800, formSize, widgetType)}; }
                  .${NotadoWidgetUtil.buttonHide(businessId, widgetFor, forEntityId)} { right: ${NotadoWidgetUtil.computeCloseButtonPosition(800, formSize, widgetType)}; }
                }
                @media (min-width: 1000px) {
                  .${NotadoWidgetUtil.iFrame(businessId, widgetFor, forEntityId)} { width: ${NotadoWidgetUtil.computeFormSize(1000, formSize, widgetType)}; }
                  .${NotadoWidgetUtil.buttonHide(businessId, widgetFor, forEntityId)} { right: ${NotadoWidgetUtil.computeCloseButtonPosition(1000, formSize, widgetType)}; }
                }
                @media (min-width: 1200px) {
                  .${NotadoWidgetUtil.iFrame(businessId, widgetFor, forEntityId)} { width: ${NotadoWidgetUtil.computeFormSize(1200, formSize, widgetType)}; }
                  .${NotadoWidgetUtil.buttonHide(businessId, widgetFor, forEntityId)} { right: ${NotadoWidgetUtil.computeCloseButtonPosition(1200, formSize, widgetType)}; }
                }
                @media (min-width: 1400px) {
                  .${NotadoWidgetUtil.iFrame(businessId, widgetFor, forEntityId)} { width: ${NotadoWidgetUtil.computeFormSize(1400, formSize, widgetType)}; }
                  .${NotadoWidgetUtil.buttonHide(businessId, widgetFor, forEntityId)} { right: ${NotadoWidgetUtil.computeCloseButtonPosition(1400, formSize, widgetType)}; }
                }
              </style>
              `;
    script = script.replace(/(\n)/gm, '');
    style = style.replace(/(\n)/gm, '');

    switch (buttonPosition) {
      case 'RELATIVE':
        return reservationButton + '\n' + script + '\n' + style;
      default:
        return script + '\n' + style;
    }
  }

  public static createWidgetLink(businessId: number,
                                 label: string,
                                 buttonPosition: string,
                                 url: string): string {
    const reservationButton: string = '<button id="' + NotadoWidgetUtil.buttonShow(businessId, null) + '" class="' + NotadoWidgetUtil.buttonShow(businessId, WidgetFor.BUSINESS) + '">' + label + '</button>';
    const fileLink: string = '<script type="text/javascript" src="' + NotadoWidgetUtil.javaScriptFileUrl(url, businessId) + '"></script>';
    switch (buttonPosition) {
      case 'RELATIVE':
        return reservationButton + '\n' + fileLink;
      default:
        return fileLink;
    }
  }

  public static createWidgetJavascriptFileContent(businessId: number,
                                                  label: string,
                                                  buttonPosition: string,
                                                  url: string): string {
    // script = script.replace(/(\n)/gm, '');

    return ` var notadoWidget = {
                  getMaxZIndex: function () {
                    var zIndex, z = 0,
                      all = document.getElementsByTagName("*");
                    for (var i = 0, n = all.length; i < n; i++) {
                      zIndex = document.defaultView.getComputedStyle(all[i], null).getPropertyValue("z-index");
                      zIndex = parseInt(zIndex, 10);
                      z = (zIndex) ? Math.max(z, zIndex) : z;
                    }
                    return z;
                  },
                  createIframe: function () {
                    var iFrame = document.createElement("iframe");
                    iFrame.id = "${NotadoWidgetUtil.iFrame(businessId, WidgetFor.BUSINESS)}";
                    iFrame.className = "${NotadoWidgetUtil.iFrame(businessId, WidgetFor.BUSINESS)}";
                    iFrame.setAttribute("frameborder", 0);
                    iFrame.setAttribute("allowtransparency", "true");
                    iFrame.src = "${url}";
                    document.getElementsByTagName("body")[0].appendChild(iFrame);
                    return iFrame;
                  },
                  createCloseButton: function () {
                    var button = document.createElement("button");
                    button.id = "${NotadoWidgetUtil.buttonHide(businessId, WidgetFor.BUSINESS)}";
                    button.className = "${NotadoWidgetUtil.buttonHide(businessId, WidgetFor.BUSINESS)}";
                    document.getElementsByTagName("body")[0].appendChild(button);
                    return button;
                  },
                  createReservationButton: function () {
                    var button = document.createElement("button");
                    button.id = "${NotadoWidgetUtil.buttonShow(businessId, WidgetFor.BUSINESS)}";
                    button.className = "${NotadoWidgetUtil.buttonShow(businessId, WidgetFor.BUSINESS)}";
                    button.innerHTML = "${label}";
                    document.getElementsByTagName("body")[0].appendChild(button);
                    return button;
                  },
                  initButtonActions: function () {
                       var windowWidth = window.innerWidth;
                       if (windowWidth < 600) {
                             ${NotadoWidgetUtil.iFrame(businessId, WidgetFor.BUSINESS)}.style.display = 'none';
                             ${NotadoWidgetUtil.buttonShow(businessId, WidgetFor.BUSINESS)}.addEventListener("click", function() {
                              window.open("${url}", '_blank');
                           });
                           return;
                       }
                         ${NotadoWidgetUtil.buttonHide(businessId, WidgetFor.BUSINESS)}.style.display = 'none';
                         ${NotadoWidgetUtil.iFrame(businessId, WidgetFor.BUSINESS)}.style.display = 'none';
                         ${NotadoWidgetUtil.buttonHide(businessId, WidgetFor.BUSINESS)}.addEventListener("click", function() {
                                     ${NotadoWidgetUtil.buttonHide(businessId, WidgetFor.BUSINESS)}.style.display = 'none';
                                     ${NotadoWidgetUtil.iFrame(businessId, WidgetFor.BUSINESS)}.style.display = 'none';
                                             });
                         ${NotadoWidgetUtil.buttonShow(businessId, WidgetFor.BUSINESS)}.addEventListener("click", function() {
                                     ${NotadoWidgetUtil.buttonHide(businessId, WidgetFor.BUSINESS)}.style.display = 'block';
                                     ${NotadoWidgetUtil.iFrame(businessId, WidgetFor.BUSINESS)}.style.display = 'block';
                                             });
                       window.addEventListener("message", function (e) {
                               if (e && e.data == "closeNotadoIframe") {
                                       ${NotadoWidgetUtil.iFrame(businessId, WidgetFor.BUSINESS)}.style.display = 'none';
                                       ${NotadoWidgetUtil.buttonHide(businessId, WidgetFor.BUSINESS)}.style.display = 'none';
                       }});
                  },
                 initWidget: function () {
                    var cssFilePath = '<link href="${NotadoWidgetUtil.styleFileUrl(url, businessId)}" rel="stylesheet" type="text/css" />';
                    document.head.insertAdjacentHTML("beforeend", cssFilePath);
                    setTimeout(function () {
                          notadoWidget.createCloseButton();
                          notadoWidget.createIframe();
                          ${NotadoWidgetUtil.notadoButtonShow(buttonPosition)};
                          notadoWidget.initButtonActions();
                          setTimeout(() => {
                                  var ${NotadoWidgetUtil.buttonShow(businessId, WidgetFor.BUSINESS)} = document.getElementById("${NotadoWidgetUtil.buttonShow(businessId, WidgetFor.BUSINESS)}");
                                  ${NotadoWidgetUtil.buttonShow(businessId, WidgetFor.BUSINESS)}.style.zIndex = notadoWidget.getMaxZIndex("body") + 1;
                                  var ${NotadoWidgetUtil.iFrame(businessId, WidgetFor.BUSINESS)} = document.getElementById("${NotadoWidgetUtil.iFrame(businessId, WidgetFor.BUSINESS)}");
                                  ${NotadoWidgetUtil.iFrame(businessId, WidgetFor.BUSINESS)}.style.zIndex = notadoWidget.getMaxZIndex("body") + 2;
                                  var ${NotadoWidgetUtil.buttonHide(businessId, WidgetFor.BUSINESS)} = document.getElementById("${NotadoWidgetUtil.buttonHide(businessId, WidgetFor.BUSINESS)}");
                                  ${NotadoWidgetUtil.buttonHide(businessId, WidgetFor.BUSINESS)}.style.zIndex = notadoWidget.getMaxZIndex("body") + 3;
                          }, 500);
                    }, 300);
                  }
             };
             document.addEventListener("DOMContentLoaded", notadoWidget.initWidget(), false);`
  }

  private static getHideButtonStyle(widgetType: WidgetType): string {
    if (widgetType === WidgetType.RIGHT_SIDE) {
      return `position: fixed;
              bottom: 95vh;
              width: 35px;
              height: 35px;
              border-radius: 50%;
              background: white;
              display: none;
              background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAARVBMVEUAAABAUGBEWWNBWV9DVWFFWWNFWmREWWNEWmNDV2BEWmNEWWRCWmNEWWJDWWRFWGNEWGJEWmNEWWRDWWREWWNFWmT////nTSXdAAAAFXRSTlMAELQrKrrp6Lw17/A2U1xdZb7AF8b7jkLoAAAAAWJLR0QWfNGoGQAAAAd0SU1FB+YLGgYsBQlrN0YAAABYSURBVAjXTY1JEoAgDAQHxAV3hfz/q6aAMObWXTVpOD/ALniHUSYTYZYFcTWhuO0oIhBNdKziIBYhPwRO5YuoW2G2vLpbpYcs20NNsFvFw5CKFymzG3P6AGjxBZLv6mAuAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIyLTExLTI2VDA2OjQ0OjA0KzAwOjAw+nzFeQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMi0xMS0yNlQwNjo0NDowNCswMDowMIshfcUAAAAodEVYdGRhdGU6dGltZXN0YW1wADIwMjItMTEtMjZUMDY6NDQ6MDUrMDA6MDB6Q1euAAAAAElFTkSuQmCC");
              background-repeat: no-repeat;
              background-position: center center;
              background-size: 12px 12px;
              box-sizing: border-box;
              border: 1px solid;
              cursor: pointer;
  `
    }
    return ` position: absolute;
             top: 3px;
             right: -20px;
             width: 35px;
             height: 35px;
             border-radius: 50%;
             background: white;
             background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAARVBMVEUAAABAUGBEWWNBWV9DVWFFWWNFWmREWWNEWmNDV2BEWmNEWWRCWmNEWWJDWWRFWGNEWGJEWmNEWWRDWWREWWNFWmT////nTSXdAAAAFXRSTlMAELQrKrrp6Lw17/A2U1xdZb7AF8b7jkLoAAAAAWJLR0QWfNGoGQAAAAd0SU1FB+YLGgYsBQlrN0YAAABYSURBVAjXTY1JEoAgDAQHxAV3hfz/q6aAMObWXTVpOD/ALniHUSYTYZYFcTWhuO0oIhBNdKziIBYhPwRO5YuoW2G2vLpbpYcs20NNsFvFw5CKFymzG3P6AGjxBZLv6mAuAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIyLTExLTI2VDA2OjQ0OjA0KzAwOjAw+nzFeQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMi0xMS0yNlQwNjo0NDowNCswMDowMIshfcUAAAAodEVYdGRhdGU6dGltZXN0YW1wADIwMjItMTEtMjZUMDY6NDQ6MDUrMDA6MDB6Q1euAAAAAElFTkSuQmCC");
             background-repeat: no-repeat;
             background-position: center center;
             background-size: 12px 12px;
             box-sizing: border-box;
             border: 1px solid;
             cursor: pointer;`;

  }

  private static getIFrameStyle(widgetType: WidgetType): string {
    if (widgetType === WidgetType.RIGHT_SIDE) {
      return `position: fixed;
              right: 0vw;
              bottom: 0vh;
              -webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
              -moz-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
              box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
              border-top-left-radius: 10px;
              border-bottom-left-radius: 10px;
              height: 100%;
              animation: animOpen 0.5s forwards;`;
    }
    return ` position: fixed;
             top: 50%;
             left: 50%;
             transform: translate(-50%, -50%);
             -webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
             -moz-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
             box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
             border-radius: 10px;
             animation: animOpen 0.5s forwards;
             height: 95%;`;
  }


  public static createWidgetStyleFileContent(businessId: number,
                                             colorBackground: string,
                                             colorLabel: string,
                                             label: string,
                                             radius: string,
                                             formSize: string,
                                             buttonPosition: string,
                                             widgetType: WidgetType,
                                             widgetFor: WidgetFor,
                                             forEntityId: number
  ): string {
    // style = style.replace(/(\n)/gm, '');
    return `
          .${NotadoWidgetUtil.buttonShow(businessId, widgetFor, forEntityId)} {
                            background: ${colorBackground};
                            color: ${colorLabel};
                            padding: 15px 25px;
                            font-size: 1.1em;
                            border-radius: ${radius};
                            ${NotadoWidgetUtil.computePosition(buttonPosition)}
                            border: 1px solid;
                            cursor: pointer;
          }

          .${NotadoWidgetUtil.iFrame(businessId, widgetFor, forEntityId)} {
            ${NotadoWidgetUtil.getIFrameStyle(widgetType)}
          }

          .${NotadoWidgetUtil.buttonHide(businessId, widgetFor, forEntityId)} {
            ${NotadoWidgetUtil.getHideButtonStyle(widgetType)}
          }

          @media (max-width: 576px) {
            .${NotadoWidgetUtil.iFrame(businessId, widgetFor, forEntityId)} { width: 100%; }
            .${NotadoWidgetUtil.buttonHide(businessId, widgetFor, forEntityId)} { right: 10vw; }
          }

          @media (min-width: 576px) {
            @keyframes animOpen { from { width: 0; } to { width: ${NotadoWidgetUtil.computeFormSize(650, formSize, widgetType)}; } }
            .${NotadoWidgetUtil.buttonHide(businessId, widgetFor, forEntityId)} { right: ${NotadoWidgetUtil.computeCloseButtonPosition(650, formSize, widgetType)}; }
          }

          @media (min-width: 650px) {
            @keyframes animOpen { from { width: 0; } to { width: ${NotadoWidgetUtil.computeFormSize(650, formSize, widgetType)}; } }
            .${NotadoWidgetUtil.buttonHide(businessId, widgetFor, forEntityId)} { right: ${NotadoWidgetUtil.computeCloseButtonPosition(650, formSize, widgetType)}; }
          }

          @media (min-width: 800px) {
            @keyframes animOpen { from { width: 0; } to { width: ${NotadoWidgetUtil.computeFormSize(800, formSize, widgetType)}; } }
            .${NotadoWidgetUtil.buttonHide(businessId, widgetFor, forEntityId)} { right: ${NotadoWidgetUtil.computeCloseButtonPosition(800, formSize, widgetType)}; }
          }

          @media (min-width: 1000px) {
            @keyframes animOpen { from { width: 0; } to { width: ${NotadoWidgetUtil.computeFormSize(1000, formSize, widgetType)}; } }
            .${NotadoWidgetUtil.buttonHide(businessId, widgetFor, forEntityId)} { right: ${NotadoWidgetUtil.computeCloseButtonPosition(1000, formSize, widgetType)}; }
          }

          @media (min-width: 1200px) {
            @keyframes animOpen { from { width: 0; } to { width: ${NotadoWidgetUtil.computeFormSize(1200, formSize, widgetType)}; } }
            .${NotadoWidgetUtil.buttonHide(businessId, widgetFor, forEntityId)} { right: ${NotadoWidgetUtil.computeCloseButtonPosition(1200, formSize, widgetType)}; }
          }

          @media (min-width: 1400px) {
            @keyframes animOpen { from { width: 0; } to { width: ${NotadoWidgetUtil.computeFormSize(1400, formSize, widgetType)}; } }
            .${NotadoWidgetUtil.buttonHide(businessId, widgetFor, forEntityId)} { right: ${NotadoWidgetUtil.computeCloseButtonPosition(1400, formSize, widgetType)}; }
          }
        `
  }

  public static buttonShow(business: number, widgetFor: WidgetFor, entityId?: number): string {
    if (widgetFor === WidgetFor.SERVICE) {
      return 'notadoButtonShow' + business + 's' + entityId;
    }

    if (widgetFor === WidgetFor.SERVICE_GROUP) {
      return 'notadoButtonShow' + business + 'sg' + entityId;
    }

    return 'notadoButtonShow' + business;
  }

  private static buttonHide(business: number, widgetFor: WidgetFor, entityId?: number): string {
    if (widgetFor === WidgetFor.SERVICE) {
      return 'notadoButtonHide' + business + 's' + entityId;
    }

    if (widgetFor === WidgetFor.SERVICE_GROUP) {
      return 'notadoButtonHide' + business + 'sg' + entityId;
    }

    return 'notadoButtonHide' + business;
  }

  private static iFrame(business: number, widgetFor: WidgetFor, entityId?: number): string {
    if (widgetFor === WidgetFor.SERVICE) {
      return 'notadoIframe' + business + 's' + entityId;
    }

    if (widgetFor === WidgetFor.SERVICE_GROUP) {
      return 'notadoIframe' + business + 'sg' + entityId;
    }
    return 'notadoIframe' + business;
  }

  public static urlFor(url: string, forEntity: WidgetFor, entityId: number): string {
    if (forEntity === WidgetFor.SERVICE) {
      return url + '/form-service-selected/' + entityId;
    }
    if (forEntity === WidgetFor.SERVICE_GROUP) {
      return url + '/form-service-group-selected/' + entityId;
    }
    return url;
  }

  public static javaScriptFileUrl(url: string, business: number): string {
    return url + '/reservation-script/notado' + business + '.js';
  }

  public static styleFileUrl(url: string, business: number): string {
    return url + '/reservation-script/notado' + business + '.css';
  }


  public static computeFormSize(screenSize: number, formSize: string, widgetType: WidgetType): string {
    if (widgetType === WidgetType.POP_UP) {
      switch (screenSize) {
        case 650:
          return '90%';
        case 800:
          return '70%';
        case 1000:
          return '50%';
        case 1200:
          return '85%';
        case 1400:
        default:
          return '75%';
      }
    }
    switch (screenSize) {
      case 650:
        switch (formSize) {
          case 'SMALL_FORM':
          case 'BIG_FORM':
            return '90%';
        }
        break;
      case 800:
        switch (formSize) {
          case 'SMALL_FORM':
          case 'BIG_FORM':
            return '70%';
        }
        break;
      case 1000:
        switch (formSize) {
          case 'SMALL_FORM':
          case 'BIG_FORM':
            return '50%';
        }
        break;
      case 1200:
        switch (formSize) {
          case 'SMALL_FORM':
            return '70%';
          case 'BIG_FORM':
            return '85%';
        }
      case 1400:
        switch (formSize) {
          case 'SMALL_FORM':
            return '50%';
          case 'BIG_FORM':
            return '75%';
        }
        break;
    }
    return '90%';
  }


  public static computeCloseButtonPosition(screenSize: number,
                                           formSize: string,
                                           widgetType: WidgetType): string {
    if (widgetType === WidgetType.POP_UP) {
      switch (screenSize) {
        case 650:
          return '3vw';
        case 800:
          return '14vw';
        case 1000:
          return '24vw';
        case 1200:
          return '7vw';
        case 1400:
          return '12vw';
      }
      return '3vw';
    }
    switch (screenSize) {
      case 650:
        switch (formSize) {
          case 'SMALL_FORM':
          case 'BIG_FORM':
            return '91vw';
        }
        break;
      case 800:
        switch (formSize) {
          case 'SMALL_FORM':
          case 'BIG_FORM':
            return '71vw';
        }
        break;
      case 1000:
        switch (formSize) {
          case 'SMALL_FORM':
          case 'BIG_FORM':
            return '51vw';
        }
        break;
      case 1200:
        switch (formSize) {
          case 'SMALL_FORM':
            return '71vw';
          case 'BIG_FORM':
            return '86vw';
        }
      case 1400:
        switch (formSize) {
          case 'SMALL_FORM':
            return '51vw';
          case 'BIG_FORM':
            return '76vw';
        }
        break;
    }
    return '91vw';
  }


  public static computePosition(buttonPosition: string): string {
    switch (buttonPosition) {
      case 'RELATIVE':
        return '';
      case 'BOTTOM_RIGHT':
        return 'position: fixed; bottom: 40px; right: 40px;';
      case 'BOTTOM_LEFT':
        return 'position: fixed; bottom: 40px; left: 40px;';
      case 'TOP_RIGHT':
        return 'position: fixed; top: 40px; right: 40px;';
    }
  }

  private static notadoButtonShow(buttonPosition: string) {
    switch (buttonPosition) {
      case 'RELATIVE':
        return '';
      default:
        return 'notadoWidget.createReservationButton();';
    }
  }
}
