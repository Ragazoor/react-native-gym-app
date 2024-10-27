export type GoogleEventDto = {
  kind: "calendar#event";
  etag: string;
  id: string;
  status: string;
  created: string;
  updated: string;
  summary: string;
  description: string;
  location: string;
  colorId: string;
  start: {
    dateTime: Date;
    timeZone: string;
  };
  end: {
    dateTime: Date;
    timeZone: string;
  };
  recurrence: string[];
  eventType: string;
};

export function parseGoogleEvent(data: any): GoogleEventDto {
  try {
    return {
      kind: data.kind,
      etag: data.etag,
      id: data.id,
      status: data.status,
      created: data.created,
      updated: data.updated,
      summary: data.summary,
      description: data.description,
      location: data.location,
      colorId: data.colorId,
      start: {
        dateTime: new Date(data.start.dateTime),
        timeZone: data.start.timeZone,
      },
      end: {
        dateTime: new Date(data.end.dateTime),
        timeZone: data.end.timeZone,
      },
      recurrence: data.recurrence,
      eventType: data.eventType,
    };
  } catch (error) {
    console.error("Error:", error);
    console.log("Error parsing google event", data);
    throw new ReferenceError("Error parsing google event");
  }
}
