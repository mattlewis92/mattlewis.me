/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

declare const System: SystemJs;
interface SystemJs {
  import: (moduleName: string) => Promise<any>;
}