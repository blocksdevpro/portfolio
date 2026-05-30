import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  SealCheck,
  MapPin,
  Globe,
  Clock,
  EnvelopeSimple,
  User,
  Terminal,
} from "@phosphor-icons/react";
import { ResumeData } from "@/types/resume";

interface HeroProps {
  data: ResumeData;
}

export const Hero: React.FC<HeroProps> = ({ data }) => {
  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  );

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    };

    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Derive current company safely
  const currentCompany = "";

  return (
    <section className="animate-fade-in space-y-8 delay-100">
      {/* Top Section: Profile Header */}
      <div className="flex flex-col-reverse sm:flex-row items-start justify-between gap-8 sm:gap-12">
        <div className="flex-1 flex flex-col gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground flex items-center gap-2">
              {data.name}
              <SealCheck className="w-7 h-7 text-blue-500 shrink-0" weight="duotone" />
            </h1>
            <p className="text-lg font-medium text-muted-foreground">
              {data.title}
            </p>
          </div>

          <p className="text-muted-foreground leading-relaxed max-w-lg text-lg">
            {data.description}
          </p>
        </div>

        <div className="relative shrink-0 self-start sm:self-center">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 shadow-lg rotate-3 transition-transform hover:rotate-0 duration-300">
            <Image
              src={data.avatar}
              alt={data.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 96px, 128px"
              priority
            />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-card text-[10px] font-medium px-2 py-1 rounded-full border shadow-sm flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-muted-foreground">Open to work</span>
          </div>
        </div>
      </div>

      {/* Bottom Section: Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-sm text-muted-foreground">
        {/* Left Card */}
        <div className="border bg-card rounded-lg p-5 space-y-3">
          <div className="flex items-center gap-3 overflow-hidden">
            <Terminal className="w-4 h-4 shrink-0" />

            <span className="truncate">
              {data.title}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 shrink-0" />
            <span>{data.location}</span>
          </div>
          <div className="flex items-center gap-3">
            <Globe className="w-4 h-4 shrink-0" />
            <a
              href={data.website}
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground hover:underline underline-offset-4"
            >
              {data.website.replace(/^https?:\/\//, "")}
            </a>
          </div>
        </div>

        {/* Right Card */}
        <div className="border bg-card rounded-lg p-5 space-y-3">
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 shrink-0" />
            <span>{time} (Local)</span>
          </div>
          <div className="flex items-center gap-3">
            <EnvelopeSimple className="w-4 h-4 shrink-0" />
            <a
              href={`mailto:${data.email}`}
              className="hover:text-foreground hover:underline underline-offset-4"
            >
              {data.email}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <User className="w-4 h-4 shrink-0" />
            <span>{data.pronouns || "he/him"}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
