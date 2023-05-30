import {
  createIntegration,
  createComponent,
  RuntimeEnvironment,
  RuntimeContext,
} from "@gitbook/runtime";

import { extractSupademoDemoFromURL } from "./supademo";

interface SupademoInstallationConfiguration {}

type SupademoRuntimeEnvironment =
  RuntimeEnvironment<SupademoInstallationConfiguration>;
type SupademoRuntimeContext = RuntimeContext<SupademoRuntimeEnvironment>;

/**
 * Component to render the block when embeding an Supademo URL.
 */
const embedBlock = createComponent<{
  demoId?: string;
  url?: string;
}>({
  componentId: "embed",

  async action(element, action) {
    switch (action.action) {
      case "@link.unfurl": {
        const { url } = action;
        const nodeProps = extractSupademoDemoFromURL(url);

        return {
          props: {
            ...nodeProps,
            url,
          },
        };
      }
    }

    return element;
  },

  async render(element, context) {
    const { environment } = context;
    const { demoId, url } = element.props;

    if (!demoId) {
      return (
        <block>
          <card
            title={"Supademo"}
            onPress={{
              action: "@ui.url.open",
              url,
            }}
            icon={
              <image
                source={{
                  url: environment.integration.urls.icon,
                }}
                aspectRatio={1}
              />
            }
          />
        </block>
      );
    }

    return (
      <block>
        <webframe
          source={{
            url: `https://app.supademo.com/embed/${demoId}`,
          }}
          aspectRatio={1}
        />
      </block>
    );
  },
});

export default createIntegration<SupademoRuntimeContext>({
  components: [embedBlock],
});
