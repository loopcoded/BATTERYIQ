"use client"

import  React from "react"
import { useMemo } from "react";
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Battery, Zap, DollarSign, Factory, CheckCircle, ArrowRight } from "lucide-react"

interface BatteryRecommendation {
  name: string
  type: string
  description: string
  whySuitable: string[]
  cost: string
  manufacturer: string[]
  capacity: string
  voltage: string
  lifespan: string
  applications: string[]
  pros: string[]
  cons: string[]
}

// Floating particles component
const FloatingParticles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${3 + Math.random() * 4}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(100vh) translateX(0px);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-100px) translateX(${Math.random() * 200 - 100}px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

// Rotating background battery
const RotatingBackgroundBattery = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-10">
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 animate-spin"
        style={{ animationDuration: "20s" }}
      >
        <div className="w-full h-full border-2 border-cyan-400/30 rounded-lg bg-gradient-to-b from-cyan-500/5 to-blue-500/10">
          {/* Battery charge level */}
          <div className="absolute bottom-4 left-4 right-4 h-16 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded" />
          {/* Lightning symbol */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Zap className="h-24 w-24 text-cyan-400/30" />
          </div>
          {/* Wireframe grid */}
          <div
            className="absolute inset-0 border border-cyan-400/20 rounded-lg"
            style={{
              background: `
                linear-gradient(90deg, transparent 49%, rgba(6, 182, 212, 0.1) 50%, transparent 51%),
                linear-gradient(0deg, transparent 49%, rgba(6, 182, 212, 0.1) 50%, transparent 51%)
              `,
              backgroundSize: "20px 20px",
            }}
          />
        </div>
        {/* Battery top */}
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 rounded-t" />
      </div>
    </div>
  )
}

// Hexagon component
const HexagonIcon = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 transform rotate-45 rounded-lg backdrop-blur-sm">
        <div className="absolute inset-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded transform -rotate-45 flex items-center justify-center">
          <div className="transform rotate-45">{children}</div>
        </div>
      </div>
    </div>
  )
}

// Enhanced Battery Image Display Component
// Enhanced Battery Image Display Component
const DynamicBatteryImage = ({ batteryName, batteryType }: { batteryName: string; batteryType: string }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isLoadingImage, setIsLoadingImage] = useState(true)
  const [imageError, setImageError] = useState(false)

  React.useEffect(() => {
    const fetchBatteryImageFromPixabay = async () => {
      try {
        setIsLoadingImage(true)
        setImageError(false)
        
        // Create specific search queries based on battery type and application
        let searchQuery = 'battery technology'
        const typeAndName = `${batteryType} ${batteryName}`.toLowerCase()
        
        if (typeAndName.includes('solar') || typeAndName.includes('photovoltaic')) {
          searchQuery = 'solar battery energy storage'
        } else if (typeAndName.includes('lithium') || typeAndName.includes('li-ion')) {
          searchQuery = 'lithium battery technology'
        } else if (typeAndName.includes('lifepo4')) {
          searchQuery = 'lithium iron phosphate battery'
        } else if (typeAndName.includes('lead') || typeAndName.includes('acid')) {
          searchQuery = 'lead acid battery'
        } else if (typeAndName.includes('electric vehicle') || typeAndName.includes('ev')) {
          searchQuery = 'electric vehicle battery'
        } else if (typeAndName.includes('power wall') || typeAndName.includes('home')) {
          searchQuery = 'home energy storage battery'
        } else if (typeAndName.includes('ups')) {
          searchQuery = 'ups battery backup'
        }
        
        // Use Pixabay API - more reliable and has better technical images
        const PIXABAY_API_KEY = '50537266-4ebac30a9837f36923b9c121d ' // Free API key - replace with your own
        const response = await fetch(
          `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(searchQuery)}&image_type=photo&orientation=horizontal&category=science&per_page=5&safesearch=true`
        )
        
        if (response.ok) {
          const data = await response.json()
          if (data.hits && data.hits.length > 0) {
            // Use the best quality image available
            const image = data.hits[0]
            setImageUrl(image.webformatURL || image.largeImageURL)
          } else {
            // Fallback to generic battery search
            const fallbackResponse = await fetch(
              `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=battery+power&image_type=photo&orientation=horizontal&per_page=3&safesearch=true`
            )
            const fallbackData = await fallbackResponse.json()
            if (fallbackData.hits && fallbackData.hits.length > 0) {
              setImageUrl(fallbackData.hits[0].webformatURL)
            } else {
              setImageError(true)
            }
          }
        } else {
          // If Pixabay fails, try Pexels API as secondary option
          try {
            const pexelsResponse = await fetch(
              `https://api.pexels.com/v1/search?query=${encodeURIComponent(searchQuery)}&per_page=1&orientation=landscape`,
              {
                headers: {
                  'Authorization': 'JekbTXUciMFuX8ZQnuQKWbRhr3wFYlHHSxw93sqDyOWg4LeKkmUFBxr9' // Free API key
                }
              }
            )
            
            if (pexelsResponse.ok) {
              const pexelsData = await pexelsResponse.json()
              if (pexelsData.photos && pexelsData.photos.length > 0) {
                setImageUrl(pexelsData.photos[0].src.large)
              } else {
                setImageError(true)
              }
            } else {
              setImageError(true)
            }
          } catch (pexelsError) {
            console.error('Pexels API error:', pexelsError)
            setImageError(true)
          }
        }
      } catch (error) {
        console.error('Error fetching battery image:', error)
        setImageError(true)
      } finally {
        setIsLoadingImage(false)
      }
    }

    fetchBatteryImageFromPixabay()
  }, [batteryName, batteryType])

  return (
    <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden border border-cyan-400/30 bg-slate-800/50 backdrop-blur-md">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 49%, rgba(6, 182, 212, 0.1) 50%, transparent 51%),
              linear-gradient(-45deg, transparent 49%, rgba(6, 182, 212, 0.1) 50%, transparent 51%)
            `,
            backgroundSize: "20px 20px",
            animation: "slide 10s linear infinite",
          }}
        />
      </div>

      {/* Loading State */}
      {isLoadingImage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-cyan-300 text-sm">Fetching battery visualization...</p>
          </div>
        </div>
      )}

      {/* Image Display */}
      {imageUrl && !isLoadingImage && (
        <div className="relative w-full h-full">
          <img
            src={imageUrl}
            alt={`${batteryName} - ${batteryType}`}
            className="w-full h-full object-cover opacity-80"
            onError={() => setImageError(true)}
          />
          {/* Overlay with battery info */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent">
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-500/20 rounded-lg border border-cyan-400/30 backdrop-blur-sm">
                  <Battery className="h-6 w-6 text-cyan-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">{batteryName}</p>
                  <p className="text-cyan-300 text-sm">{batteryType} Technology</p>
                </div>
              </div>
            </div>
          </div>
          {/* Animated Tech Overlay */}
          <div className="absolute top-4 right-4">
            <div className="flex items-center gap-2 bg-slate-900/60 backdrop-blur-sm rounded-lg px-3 py-2 border border-cyan-400/30">
              <Zap className="h-4 w-4 text-cyan-400 animate-pulse" />
              <span className="text-cyan-300 text-sm font-medium">ACTIVE</span>
            </div>
          </div>
        </div>
      )}

      {/* Error State or Fallback */}
      {(imageError || (!imageUrl && !isLoadingImage)) && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            {/* Animated 3D Battery Fallback */}
            <div className="mx-auto w-24 h-32 relative mb-4">
              <div className="absolute inset-0 border-2 border-cyan-400/50 rounded-lg bg-gradient-to-b from-cyan-500/20 to-blue-500/30 backdrop-blur-sm">
                <div className="absolute bottom-2 left-2 right-2 h-6 bg-gradient-to-r from-cyan-400 to-blue-400 rounded opacity-80 animate-pulse" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-cyan-400 animate-pulse" />
                </div>
                <div
                  className="absolute inset-0 border border-cyan-400/30 rounded-lg"
                  style={{
                    background: `
                      linear-gradient(90deg, transparent 49%, rgba(6, 182, 212, 0.2) 50%, transparent 51%),
                      linear-gradient(0deg, transparent 49%, rgba(6, 182, 212, 0.2) 50%, transparent 51%)
                    `,
                    backgroundSize: "8px 8px",
                  }}
                />
              </div>
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 border border-cyan-400/50 rounded-t backdrop-blur-sm" />
            </div>
            <p className="text-cyan-300 font-semibold">{batteryName}</p>
            <p className="text-cyan-400/70 text-sm">{batteryType} Technology</p>
          </div>
        </div>
      )}

      {/* CSS for sliding animation */}
      <style jsx>{`
        @keyframes slide {
          0% {
            transform: translateX(-20px) translateY(-20px);
          }
          100% {
            transform: translateX(0px) translateY(0px);
          }
        }
      `}</style>
    </div>
  )
}

function extractJsonFromMarkdown(md: string): string | null {
  const match = md.match(/```json\n([\s\S]*?)```/);
  return match ? match[1] : null;
}

function normalizeRecommendation(rec: any): BatteryRecommendation {
  return {
    ...rec,
    manufacturer: typeof rec.manufacturer === "string"
      ? rec.manufacturer.split(",").map((m: string) => m.trim())
      : Array.isArray(rec.manufacturer)
      ? rec.manufacturer
      : [],

    whySuitable: typeof rec.whySuitable === "string"
      ? [rec.whySuitable]
      : Array.isArray(rec.whySuitable)
      ? rec.whySuitable
      : [],

    limitations: typeof rec.limitations === "string"
      ? [rec.limitations]
      : Array.isArray(rec.limitations)
      ? rec.limitations
      : [],

    scenarios: typeof rec.scenarios === "string"
      ? [rec.scenarios]
      : Array.isArray(rec.scenarios)
      ? rec.scenarios
      : [],
  };
}


export default function BatteryTechProject() {
  const [scenario, setScenario] = useState("")
  const [recommendation, setRecommendation] = useState<BatteryRecommendation | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Function to fetch battery recommendation from Groq API

  const getRecommendation = async (userScenario: string): Promise<BatteryRecommendation | null> => {
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer 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`, // Replace with your real API key
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "compound-beta-mini", // or another model Groq supports
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that recommends the best battery technology based on a real-world use scenario. Respond in structured JSON format for frontend display.",
          },
          {
            role: "user",
            content: `What's the best battery technology for this scenario: "${userScenario}"? If there are batteries better or more use than  Lithium Batteries then show that . Please include fields like name, type, description, whySuitable, cost, manufacturer, capacity, voltage, lifespan, applications, pros, and cons.`,
          },
        ],
        temperature: 0.7,
      }),
    })

    const data = await response.json()

    const messageContent = data.choices?.[0]?.message?.content;
    console.log("API Response:", messageContent);
    if (!messageContent) return null;

    const jsonString = extractJsonFromMarkdown(messageContent);
    if (!jsonString) {
     console.error("No JSON block found in API response");
     return null;
    }
  const parsed: BatteryRecommendation = JSON.parse(jsonString);
  console.log("Parsed Recommendation:", parsed);
  if (parsed && parsed.manufacturer && !Array.isArray(parsed.manufacturer)) {
    parsed.manufacturer = [parsed.manufacturer];
  }
  const recommendation = normalizeRecommendation(parsed);
  return recommendation;
  } catch (error) {
    console.error("Error fetching recommendation:", error)
    return null
   }
  }
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  if (!scenario.trim()) return

  setIsLoading(true)

  const result = await getRecommendation(scenario)
  setRecommendation(result)

  setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: "url('/tech-bg.png')" }}
      />

      {/* Animated Grid Background */}
      <div className="fixed inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <FloatingParticles />
      <RotatingBackgroundBattery />

      {/* Header */}
      <header className="relative z-10 border-b border-cyan-500/20 bg-slate-900/80 backdrop-blur-md sticky top-0">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <HexagonIcon>
              <Battery className="h-6 w-6 text-cyan-400" />
            </HexagonIcon>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                BAATERYIQ
              </h1>
              <p className="text-sm text-cyan-300/70">Neural Battery Analysis System</p>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          {/* 3D Battery Visualization */}
          <div className="relative mb-8">
            <div className="mx-auto w-32 h-48 relative">
              {/* Battery Body */}
              <div className="absolute inset-0 border-2 border-cyan-400/50 rounded-lg bg-gradient-to-b from-cyan-500/10 to-blue-500/20 backdrop-blur-sm">
                {/* Battery Charge Level */}
                <div className="absolute bottom-2 left-2 right-2 h-8 bg-gradient-to-r from-cyan-400 to-blue-400 rounded opacity-80 animate-pulse" />
                {/* Lightning Symbol */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Zap className="h-8 w-8 text-cyan-400 animate-pulse" />
                </div>
                {/* Wireframe Effect */}
                <div
                  className="absolute inset-0 border border-cyan-400/30 rounded-lg"
                  style={{
                    background: `
            linear-gradient(90deg, transparent 49%, rgba(6, 182, 212, 0.2) 50%, transparent 51%),
            linear-gradient(0deg, transparent 49%, rgba(6, 182, 212, 0.2) 50%, transparent 51%)
          `,
                    backgroundSize: "10px 10px",
                  }}
                />
              </div>
              {/* Battery Top */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/50 rounded-t backdrop-blur-sm" />
            </div>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            NEURAL BATTERY
            <br />
            OPTIMIZATION
          </h2>
          <p className="text-xl text-cyan-100/80 max-w-3xl mx-auto mb-8 leading-relaxed">
            Advanced AI-powered battery analysis system. Input your scenario parameters and receive quantum-computed
            recommendations with precision molecular analysis.
          </p>
        </div>

        {/* Input Interface */}
        <Card className="max-w-2xl mx-auto mb-12 bg-slate-800/50 border-cyan-500/30 backdrop-blur-md shadow-2xl shadow-cyan-500/10">
          <CardHeader className="text-center border-b border-cyan-500/20">
            <CardTitle className="text-2xl flex items-center justify-center gap-3 text-cyan-100">
              <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg border border-cyan-400/30">
                <Zap className="h-6 w-6 text-cyan-400" />
              </div>
              SCENARIO ANALYSIS
            </CardTitle>
            <CardDescription className="text-cyan-300/70">
              Describe your application requirements for quantum battery optimization
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="scenario" className="text-base font-medium text-cyan-100">
                  Application Parameters
                </Label>
                <Textarea
                  id="scenario"
                  placeholder="e.g., High-performance electric vehicle requiring 300+ mile range with rapid charging capabilities..."
                  value={scenario}
                  onChange={(e) => setScenario(e.target.value)}
                  className="min-h-[120px] resize-none bg-slate-700/50 border-cyan-500/30 text-cyan-100 placeholder:text-cyan-400/50 focus:border-cyan-400 focus:ring-cyan-400/20"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium py-4 border border-cyan-400/30 shadow-lg shadow-cyan-500/20"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    QUANTUM ANALYSIS IN PROGRESS...
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    INITIATE ANALYSIS
                    <ArrowRight className="h-5 w-5" />
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results */}
        {recommendation && (
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-2 text-cyan-100">OPTIMAL BATTERY SOLUTION</h3>
              <p className="text-cyan-300/70">Quantum-computed recommendation based on molecular analysis</p>
            </div>

            {/* Main Result Card */}
            <Card className="bg-slate-800/50 border-cyan-500/30 backdrop-blur-md shadow-2xl shadow-cyan-500/10">
              <CardHeader className="text-center pb-6 border-b border-cyan-500/20">
                <div className="mx-auto w-20 h-20 bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-full flex items-center justify-center mb-4 border border-green-400/30">
                  <CheckCircle className="h-10 w-10 text-green-400" />
                </div>
                <CardTitle className="text-3xl font-bold text-cyan-100">{recommendation.name}</CardTitle>
                <CardDescription className="text-lg">
                  <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-300 border-cyan-400/30">
                    {recommendation.type}
                  </Badge>
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-8">
                {/* Dynamic Battery Image */}
                <DynamicBatteryImage 
                  batteryName={recommendation.name} 
                  batteryType={recommendation.type} 
                />

                <p className="text-lg text-cyan-100/90 text-center leading-relaxed">{recommendation.description}</p>

                <div className="grid md:grid-cols-3 gap-6">
                  {/* Cost Analysis */}
                  <Card className="bg-green-500/10 border-green-400/30 backdrop-blur-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-green-300">
                        <DollarSign className="h-5 w-5" />
                        COST MATRIX
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold text-green-400">{recommendation.cost}</p>
                      <p className="text-sm text-green-300/70 mt-1">Market optimization index</p>
                    </CardContent>
                  </Card>

                  {/* Technical Specs */}
                  <Card className="bg-blue-500/10 border-blue-400/30 backdrop-blur-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-blue-300">
                        <Battery className="h-5 w-5" />
                        TECH SPECS
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-sm text-blue-300/70">Capacity</p>
                        <p className="font-semibold text-blue-400">{recommendation.capacity}</p>
                      </div>
                      <div>
                        <p className="text-sm text-blue-300/70">Voltage</p>
                        <p className="font-semibold text-blue-400">{recommendation.voltage}</p>
                      </div>
                      <div>
                        <p className="text-sm text-blue-300/70">Lifespan</p>
                        <p className="font-semibold text-blue-400">{recommendation.lifespan}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Manufacturers */}
                  <Card className="bg-purple-500/10 border-purple-400/30 backdrop-blur-sm -ml-3">
                    <CardHeader className="pb-3 ">
                      <CardTitle className="flex items-center gap-2 text-purple-300 -ml-6">
                        <Factory className="h-5 w-5" />
                        MANUFACTURERS
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        { Array.isArray(recommendation.manufacturer) && recommendation.manufacturer.map((mfg, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="mr-2 mb-2 bg-purple-500/10 text-purple-300 border-purple-400/30"
                          >
                            {mfg}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Separator className="bg-cyan-500/20" />

                {/* Optimization Factors */}
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-cyan-100">OPTIMIZATION FACTORS</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    { Array.isArray(recommendation.whySuitable) && recommendation.whySuitable.map((reason, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 bg-green-500/10 border border-green-400/20 rounded-lg backdrop-blur-sm"
                      >
                        <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-green-300">{reason}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Performance Matrix */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-green-300">PERFORMANCE ADVANTAGES</h4>
                    <ul className="space-y-3">
                      { Array.isArray(recommendation.whySuitable) && Array.isArray(recommendation.pros) && recommendation.pros.map((pro, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                          <span className="text-cyan-100/90">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-orange-300">SYSTEM LIMITATIONS</h4>
                    <ul className="space-y-3">
                      { Array.isArray(recommendation.cons) && recommendation.cons.map((con, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                          <span className="text-cyan-100/90">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Applications */}
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-cyan-100">DEPLOYMENT SCENARIOS</h4>
                  <div className="flex flex-wrap gap-3">
                    {Array.isArray(recommendation.applications) && recommendation.applications.map((app, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-cyan-500/20 text-cyan-300 border-cyan-400/30"
                      >
                        {app}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reset Button */}
            <div className="text-center">
              <Button
                onClick={() => {
                  setRecommendation(null)
                  setScenario("")
                }}
                variant="outline"
                className="border-2 border-cyan-400/30 bg-slate-800/50 text-cyan-300 hover:bg-cyan-500/10 backdrop-blur-sm"
              >
                INITIALIZE NEW ANALYSIS
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-20 border-t border-cyan-500/20 bg-slate-900/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-cyan-300/70">© 2025 BAATERYIQ - The Power Behind Smarter Choices</p>
          </div>
        </div>
      </footer>
    </div>
  )
}